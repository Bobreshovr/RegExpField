<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %> 
<%@ Register TagPrefix="wssuc" TagName="InputFormControl" Src="~/_controltemplates/15/InputFormControl.ascx" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="RegExpFieldEdit.ascx.cs" Inherits="RegExpField.RegExpFieldEdit" %>
<wssuc:InputFormControl runat="server" LabelText="Регулярное выражение:">
    <Template_Control>
       <asp:TextBox runat="server" Width="450" ID="RegExp"></asp:TextBox>
    </Template_Control>
</wssuc:InputFormControl>
<wssuc:InputFormControl runat="server" LabelText="Текст ошибки:">
    <Template_Control>
       <asp:TextBox runat="server" Width="450" ID="ErrorMessage"></asp:TextBox>
    </Template_Control>
</wssuc:InputFormControl>