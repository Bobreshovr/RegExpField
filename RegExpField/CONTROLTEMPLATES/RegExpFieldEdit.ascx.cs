using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

namespace RegExpField
{
    public partial class RegExpFieldEdit : UserControl, IFieldEditor
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }
        public bool DisplayAsNewSection
        {
            get
            {
                return true;
            }
        }


        public void InitializeWithField(SPField field)
        {
            if (!IsPostBack)
            {
                if (field is RegExpField)
                {  
                        var Validfield = field as RegExpField;
                        RegExp.Text = Validfield.ValidRegExp;
                        ErrorMessage.Text = Validfield.ErrorMessage;
                }
            }
        }

        public void OnSaveChange(SPField field, bool isNewField)
        {
            if (field is RegExpField)
            {
                var Validfield = field as RegExpField;
                Validfield.ValidRegExp = RegExp.Text;
                Validfield.ErrorMessage = ErrorMessage.Text;
            }
        }
    }
}
