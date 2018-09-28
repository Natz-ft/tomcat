
/**
 * 右键事件处理
 */
function OnRightClick(event, treeId, treeNode) {
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        zTree.cancelSelectedNode();
        showRMenu(treeNode, event.clientX, event.clientY);
    } else if (treeNode && !treeNode.noR) {
        zTree.selectNode(treeNode);
        showRMenu(treeNode, event.clientX, event.clientY);
    }
}

/**
 * 右键事件处理
 */
/*function OpenNodeLink(event, treeId, treeNode) {
    switch (treeNode.level) {
    case "root":
        frame.setAttribute("src", appJspUrl + "?sourceId=" + treeNode.id + "&treeId=" + treeId + "&level=" + treeNode.level + "&tId=" + treeNode.tId);
        break;
    case "app":
        frame.setAttribute("src", appJspUrl + "?sourceId=" + treeNode.id + "&treeId=" + treeId + "&level=" + treeNode.level + "&tId=" + treeNode.tId);
        break;
    case "module":
        var app_id = getNodeAppId(treeNode);

        var parentId = treeNode.getParentNode().id;
        frame.setAttribute("src", moduleJspUrl + "?sourceId=" + treeNode.id + "&treeId=" + treeId + "&app_id=" + app_id + "&level=" + treeNode.level + "&tId=" + treeNode.tId + "&parentId=" + parentId + "&nodeType=" + treeNode.type);
        break;
    case "opt":
        var module_id = treeNode.getParentNode().id;
        var app_id = getNodeAppId(treeNode);
        frame.setAttribute("src", optJspUrl + "?sourceId=" + treeNode.id + "&treeId=" + treeId + "&app_id=" + app_id + "&module_id=" + module_id + "&level=" + treeNode.level + "&tId=" + treeNode.tId + "&nodeType=" + treeNode.type);
        break;
    }
}*/

//的应用id取得(前提是输入的节点是应用的下级节点)
function getNodeAppId(seNode) {
    if (!seNode) {
        return null;
    }
    var parentNode = seNode.getParentNode();

    while ("app" != parentNode.type) {
        parentNode = parentNode.getParentNode();
        if ("root" == parentNode.type) {
            break;
        }
    }
    return parentNode.id;
}

function hideRMenu() {
    if (rMenu) rMenu.css({"visibility": "hidden"});
    $("body").unbind("mousedown", onBodyMouseDown);
}
function onBodyMouseDown(event) {
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
        rMenu.css({"visibility": "hidden"});
    }
}
//var frame = document.getElementById("nodeFrame");

function getSelectedNode() {
    var nodes = zTree.getSelectedNodes();
    var selNode;
    if (nodes && nodes.length > 0) {
        selNode = nodes[0]
    }
    //没有任何节点的选中的话，默认根节点选中
    if (!selNode) {
        selNode = zTree.getNodeByParam("id", "rootId", null);
    }
    return selNode;
}

function removeTreeNode() {
    hideRMenu();
    var nodes = functionTree.getSelectedNodes();
    if (nodes && nodes.length > 0) {
        if (nodes[0].children && nodes[0].children.length > 0) {
            var msg = "要删除的节点是父节点，如果删除将连同子节点一起删掉。\n\n请确认！";
            if (confirm(msg) == true) {
                functionTree.removeNode(nodes[0]);
            }
        } else {
            functionTree.removeNode(nodes[0]);
        }
    }
}