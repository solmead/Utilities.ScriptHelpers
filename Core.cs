using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace Utilities.ScriptLibraries
{
    public static class Core
    {
        public static Bundle GetBundle()
        {
            var lst = GetIncludeList();
            return new ScriptBundle("~/bundles/syslibs").Include(lst.ToArray());
        }
        public static List<string> GetIncludeList()
        {
            return new List<string>(new string[] {
                "~/Scripts/SysLibs/es6-promise.auto.js",
                  "~/Scripts/SysLibs/JqueryEx.js",
                  "~/Scripts/SysLibs/Extensions.js",
                  "~/Scripts/SysLibs/EventHandler.js",
                  "~/Scripts/SysLibs/LinqToJs.js",
                  "~/Scripts/SysLibs/APILibrary.js",
                  "~/Scripts/SysLibs/SiteInfo.js",
                  "~/Scripts/SysLibs/Lock.js",
                  "~/Scripts/SysLibs/Tasks.js",
                  "~/Scripts/SysLibs/Debug.js",
                  "~/Scripts/SysLibs/DateTime.js",
                  "~/Scripts/SysLibs/Dialog.js",
                  "~/Scripts/SysLibs/HtmlHelpers.js",
                  "~/Scripts/SysLibs/DynamicGrid.js",
                  "~/Scripts/SysLibs/Notifications.js",
                  "~/Scripts/SysLibs/Core.js",
                  "~/Scripts/SysLibs/System-Migrate.js"});
        }
    }
}