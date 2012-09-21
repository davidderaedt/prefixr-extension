/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 */
 
/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** extension to generate CSS prefixes using the Prefixr API */
define(function (require, exports, module) {
    
    'use strict';


    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        Menus          = brackets.getModule("command/Menus");


    var ERROR_MSG = "Unable to use Prefixr";
    var EMPTY_MSG = "Empty selection";
    var API_URL = "http://prefixr.com/api/index.php";
    var MY_COMMAND_ID = "prefixr.prefixr";
    var MENU_NAME = "Generate CSS Prefixes";

    
    function handleAction() {
  
        // Retrieve selection
        var selectedText = EditorManager.getCurrentFullEditor().getSelectedText();

        if (selectedText === "") {
            window.alert(EMPTY_MSG);
            return;
        }


        // Send to prefixr
        $.ajax({
            url: API_URL,
            type: "GET",
            data: "css=" + encodeURIComponent(selectedText),

            error: function (data) {
                window.alert(ERROR_MSG);
            },

            success: function (data) {
                console.log(data);
                EditorManager.getCurrentFullEditor()._codeMirror.replaceSelection(data);
            }
        });

    }

    // Register the command and insert in the Edit menu
    CommandManager.register(MENU_NAME, MY_COMMAND_ID, handleAction);
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuDivider();
    menu.addMenuItem(MY_COMMAND_ID);
    
});