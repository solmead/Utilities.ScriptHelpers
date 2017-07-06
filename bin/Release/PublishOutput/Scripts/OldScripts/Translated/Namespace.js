/*
* Copyright (C) 2009-2012 Solmead Productions
*
* == BEGIN LICENSE ==
*
* Licensed under the terms of any of the following licenses at your
* choice:
*
*  - GNU General Public License Version 2 or later (the "GPL")
*    http://www.gnu.org/licenses/gpl.html
*
*  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
*    http://www.gnu.org/licenses/lgpl.html
*
*  - Mozilla Public License Version 1.1 or later (the "MPL")
*    http://www.mozilla.org/MPL/MPL-1.1.html
*
* == END LICENSE ==
*/
var Namespace =
{
    Register: function (_Name) {
        var chk = false;
        var cob = "";
        var spc = _Name.split(".");
        for (var i = 0; i < spc.length; i++) {
            if (cob != "") { cob += "."; }
            cob += spc[i];
            chk = this.Exists(cob);
            if (!chk) { this.Create(cob); }
        }
        if (chk) { throw "Namespace: " + _Name + " is already defined."; }
    },

    Create: function (_Src) {
        eval("window." + _Src + " = new Object();");
    },

    Exists: function (_Src) {
        eval("var NE = false; try{if(" + _Src + "){NE = true;}else{NE = false;}}catch(err){NE=false;}");
        return NE;
    }
}