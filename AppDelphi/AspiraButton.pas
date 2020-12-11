unit AspiraButton;

interface

uses

 System.SysUtils, System.Classes, Vcl.Controls, Vcl.StdCtrls,
 Vcl.Graphics, System.Types, Winapi.Messages, Winapi.Windows ;

type

 TDrawButtonEvent = procedure(Control:TWinControl;
   Rect : TRect; State : TOwnerDrawState) of object;

  TAspiraButton = class(TButton)
  private
   FCanvas: TCanvas;
   IsFocused: Boolean;
   FOnDrawButton: TDrawButtonEvent;

  protected
  procedure CreateParams(var Params : TCreateParams);override;
  procedure SetButtonStyle(ADefault :Boolean);override;
   procedure CMEnbledChanged(var Message : TMessage); message CM_ENABLEDCHANGED;
   procedure CMFontChanged(var Message :TMessage ); message CM_FONTCHANGED;
   procedure CNMeasureItem(var Message : TWMMeasureItem ); message CN_MEASUREITEM;
   procedure CNDrawItem(var Message: TWMDrawItem); Message CN_DRAWITEM;
   procedure WMLButtonDblClk(var Message :TWMLButtonDblClk); Message WM_LBUTTONDBLCLK;
   procedure DrawButton(Rect:TRect ; state : UINT);

  public
   constructor Create(AOwner : TComponent);override;
   destructor Destroy;override;
   property Canvas : TCanvas read FCanvas;

  published
   property OnDrawButton : TDrawButtonEvent read FOnDrawButton write FOnDrawButton;
   property Color;

  end;

procedure Register;

implementation

procedure Register;
begin
  RegisterComponents('Samples', [TAspiraButton]);
end;

{ TAspiraButton }

procedure TAspiraButton.CMEnbledChanged(var Message: TMessage);
begin
 inherited;
 Invalidate;

end;

procedure TAspiraButton.CMFontChanged(var Message: TMessage);
begin
 inherited;
 Invalidate;

end;

procedure TAspiraButton.CNDrawItem(var Message: TWMDrawItem);

var
 SaveIndex : Integer;
begin
 with Message.DrawItemStruct^ do
 begin
   SaveIndex := SaveDC(hDC);
   FCanvas.Lock;
   try
     FCanvas.Handle := hDC;
     FCanvas.Font := Font;
     FCanvas.Brush := Brush;
     DrawButton(rcItem, itemState);
   finally
     FCanvas.Handle := 0;
     FCanvas.Unlock;
     RestoreDC(hDC, SaveIndex);
   end;
 end;

end;

procedure TAspiraButton.CNMeasureItem(var Message: TWMMeasureItem);
begin
 with Message.MeasureItemStruct^ do
 begin
   itemWidth  := Width;
   itemHeight := Height;
 end;

end;

constructor TAspiraButton.Create(AOwner: TComponent);
begin
  inherited Create(AOwner);
 FCanvas := TCanvas.Create;

end;

procedure TAspiraButton.CreateParams(var Params: TCreateParams);
begin
 inherited CreateParams(Params);
 with Params do
   Style := Style  or BS_OWNERDRAW;

end;

destructor TAspiraButton.Destroy;
begin
 inherited Destroy;
 FCanvas.Free;

end;

procedure TAspiraButton.DrawButton(Rect: TRect; state: UINT);
var
 Flags, OldMode : LongInt;
 IsDown, IsDefault, IsDisabled :Boolean;
 OldColor : TColor;
 OrgRect : TRect;
begin
 OrgRect := Rect;
 Flags := DFCS_BUTTONPUSH or DFCS_ADJUSTRECT;
 IsDown := state and ODS_SELECTED <> 0;
 IsDefault := state and ODS_FOCUS<> 0;
 IsDisabled := state  and ODS_DISABLED <> 0;



 if IsDown  then
   Flags := Flags or DFCS_PUSHED;
 if IsDisabled then
   Flags := Flags or DFCS_INACTIVE;



 if IsFocused or IsDefault then
 begin
   FCanvas.Pen.Color := clWindowFrame;
   FCanvas.Pen.Width := 1;
   FCanvas.Brush.Style := bsClear;
   FCanvas.Rectangle(Rect.Left, Rect.Top, Rect.Right, Rect.Bottom);
   InflateRect(Rect, -1,-1);
 end;



 if IsDown then
 begin
   FCanvas.Pen.Color := clBtnShadow ;
   FCanvas.Pen.Width := 1;
   FCanvas.Brush.Color := clBtnFace;
   FCanvas.Rectangle(Rect.Left, Rect.Top, Rect.Right, Rect.Bottom);
   InflateRect(Rect, -1,-1);
 end
 else
   DrawFrameControl(FCanvas.Handle, Rect, DFC_BUTTON, Flags);



 if IsDown then
   OffsetRect(Rect,1,1);

 OldColor := FCanvas.Brush.Color;
 FCanvas.Brush.Color := Color;
 FCanvas.FillRect(Rect);
 FCanvas.Brush.Color := OldColor;
 OldMode := SetBkMode(FCanvas.Handle, TRANSPARENT);
 FCanvas.Font.Color := clBtnText;
 if IsDisabled then
   DrawState(FCanvas.Handle, FCanvas.Brush.Handle, nil, integer(Caption), 0,
   ((Rect.Right - Rect.Left)-FCanvas.TextWidth(Caption))div 2,
   ((Rect.Bottom - Rect.Top)-FCanvas.TextWidth(Caption)) div 2,
   0,0, DST_TEXT or DSS_DISABLED )
 else
   DrawText(FCanvas.Handle, PWideChar(Caption), -1, Rect,
   DT_SINGLELINE or DT_CENTER or DT_VCENTER);
 SetBkMode(FCanvas.Handle, OldMode);



 if Assigned(FOnDrawButton) then
   FOnDrawButton(Self,Rect,  TOwnerDrawState(LongRec(state).Lo));



 if IsFocused and IsDefault then
 begin
   Rect := OrgRect;
   InflateRect(Rect, -4,-4);
   FCanvas.Pen.Color := clWindowFrame;
   FCanvas.Brush.Color := clBtnFace;
   DrawFocusRect(FCanvas.Handle, Rect );
 end;
end;

procedure TAspiraButton.SetButtonStyle(ADefault: Boolean);
begin

 if ADefault <> IsFocused then
 begin
   IsFocused := ADefault;
   Refresh;
 end;

end;

procedure TAspiraButton.WMLButtonDblClk(var Message: TWMLButtonDblClk);
begin
 Perform(WM_LBUTTONDOWN, Message.Keys, longint( Message.Pos));
end;


end.
