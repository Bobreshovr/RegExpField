using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace RegExpField
{
    class RegExpField : SPFieldText
    {
        public RegExpField(SPFieldCollection fields, string fieldName) : base(fields, fieldName)
		{
		}
        public RegExpField(SPFieldCollection fields, string typeName, string displayName)
            : base(fields, typeName, displayName)
		{
		}
        public string ValidRegExp
        {
            get
            {
                return GetFieldAttribute("ValidRegExp");
            }
            set
            {
                SetFieldAttribute("ValidRegExp", value);
            }
        }
        public string ErrorMessage
        {
            get
            {
                return GetFieldAttribute("ErrorMessage");
            }
            set
            {
                SetFieldAttribute("ErrorMessage", value);
            }
        }

        /// <summary>
        /// преобразует возвращаемые данные методом в строку
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public override string JSLink
        {
            get
            {
                return "/_layouts/15/RegExpField/RegExpField.js";
            }
        }
        public override Dictionary<string, object> GetJsonClientFormFieldSchema(SPControlMode mode)
        {
            var formtctx = base.GetJsonClientFormFieldSchema(mode);
            formtctx["ValidRegExp"] = ValidRegExp;
            formtctx["ErrorMessage"] = ErrorMessage;
            return formtctx;
        }
        private void SetFieldAttribute(string attribute, string value)
        {
            Type baseType;
            BindingFlags flags;
            MethodInfo mi;

            baseType = typeof(RegExpField);
            flags = BindingFlags.Instance | BindingFlags.NonPublic;
            mi = baseType.GetMethod("SetFieldAttributeValue", flags);
            mi.Invoke(this, new object[] { attribute, value });
        }

        private string GetFieldAttribute(string attribute)
        {
            Type baseType;
            BindingFlags flags;
            MethodInfo mi;

            baseType = typeof(RegExpField);
            flags = BindingFlags.Instance | BindingFlags.NonPublic;
            mi = baseType.GetMethod("GetFieldAttributeValue",
                                        flags,
                                        null,
                                        new Type[] { typeof(String) },
                                        null);

            object obj = mi.Invoke(this, new object[] { attribute });

            if (obj == null)
                return "";
            else
                return obj.ToString();
        }

    }
}
