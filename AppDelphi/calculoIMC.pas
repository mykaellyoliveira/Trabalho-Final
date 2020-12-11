unit calculoIMC;

interface

uses
  Winapi.Windows, Winapi.Messages, System.SysUtils, System.Variants, System.Classes, Vcl.Graphics,
  Vcl.Controls, Vcl.Forms, Vcl.Dialogs, Vcl.Buttons, Vcl.ExtCtrls, Vcl.StdCtrls,
  VCLTee.TeCanvas, Vcl.Samples.Spin, System.ImageList, Vcl.ImgList,
  Vcl.ComCtrls, System.Actions, Vcl.ActnList, Vcl.ToolWin, Vcl.Imaging.pngimage,
  Vcl.Imaging.jpeg, Vcl.Mask, AspiraButton;

type

  TVazioHelper = class helper for TMaskEdit
    function Vazio: Boolean;
  end;


  TForm1 = class(TForm)
    Shape1: TShape;
    Panel1: TPanel;
    Image3: TImage;
    editHeight: TMaskEdit;
    editWeight: TMaskEdit;
    Label3: TLabel;
    Label4: TLabel;
    labelAnswer: TLabel;
    Label1: TLabel;
    Image1: TImage;
    AspiraButton1: TAspiraButton;
    procedure editWeightKeyPress(Sender: TObject; var Key: Char);
    procedure AspiraButton1Click(Sender: TObject);
  end;

var
  Form1: TForm1;

implementation

{$R *.dfm}

procedure TForm1.editWeightKeyPress(Sender: TObject; var Key: Char);
begin
if not (key in ['0'..'9', #27, #8]) then
key:= #0;
end;

procedure TForm1.AspiraButton1Click(Sender: TObject);
 var
 num1, num2, answer: real;

 begin

    if editWeight.Vazio then
      raise exception.create('Digite a altura');

    if editHeight.Vazio then
     raise exception.create('Digite o peso');


  num1 := StrToFloat(editWeight.text);
  num2 := StrToFloat(editHeight.text);
  answer :=  num1 / (num2 * num2);

  if answer < (18.5) then
    labelAnswer.Caption := 'O resultado do IMC é: ' + FloatToStrF((answer), ffFixed, 7, 2) + ' e, segundo a OMS, é considerado como: Magreza.'

  else if (answer >= (18.5)) and (answer < (25.0)) then
    labelAnswer.Caption := 'O resultado do IMC é: ' + FloatToStrF((answer), ffFixed, 7, 2) + ' e, segundo a OMS, é considerado como: Saudável.'

  else if (answer >= 25.0) and (answer < (30.0)) then
    labelAnswer.Caption := 'O resultado do IMC é: ' + FloatToStrF((answer), ffFixed, 7, 2) + ' e, segundo a OMS, é considerado como: Sobrepeso.'

  else if (answer >= 30.0) and (answer < 35.0) then
    labelAnswer.Caption := 'O resultado do IMC é: ' + FloatToStrF((answer), ffFixed, 7, 2) + ' e, segundo a OMS, é considerado como: Obesidade Grau I.'

  else if (answer >= 35.0) and (answer < 40.0) then
    labelAnswer.Caption := 'O resultado do IMC é: ' + FloatToStrF((answer), ffFixed, 7, 2) + ' e, segundo a OMS, é considerado como: Obesidade Grau II.'

  else if (answer >= 40.0) and (answer < 50.0) then
    labelAnswer.Caption := 'O resultado do IMC é: ' + FloatToStrF((answer), ffFixed, 7, 2) + ' e, segundo a OMS, é considerado como: Obesidade Grau III.'

  else if (answer >= 50.0) and (answer < 59.0) then
    labelAnswer.Caption := 'O resultado do IMC é: ' + FloatToStrF((answer), ffFixed, 7, 2) + ' e, segundo a OMS, é considerado como: Super Obeso.'

  else
    labelAnswer.Caption := 'O resultado do IMC é: ' + FloatToStrF((answer), ffFixed, 7, 2) + ' e, segundo a OMS, é considerado como: Hiper Obeso.' ;

end;



{ TVazioHelper }

function TVazioHelper.Vazio: Boolean;
begin
  Result := Trim(Self.Text) = EmptyStr;
end;
end.
