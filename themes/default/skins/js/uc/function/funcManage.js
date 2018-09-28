//ztree功能管理树设置参数
var setting = {
    async: {
        enable: true,
        type: "post",
        url: getAsyncUrl
        //dataFilter: ajaxDataFilter
    },
    data: {
        key: {
            name: "name"
        },
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: null
        }
    },
    view: {
        showLine: false,
        dblClickExpand: true,
        showIcon: true
    },
    check: {
        enable: false,
        autoExpandTrigger: true
    },
    callback: {
        onClick: OpenNodeLink,
        onDblClick: OpenNodeLink,
        onNodeCreated: zTreeOnNodeCreated
    }
};

function getAsyncUrl(treeId, treeNode) {
    if (!treeNode) {
        return getAppUrl;
    }
    //展开应用层的链接
    if ("app" == treeNode.type) {

        return (getModuleUrl + "&app_id=" + treeNode.id + "&treeId=" + treeId);
    }
    //展开模块层的链接
    if ("module" == treeNode.type) {
        var app_id = getNodeAppId(treeNode);
        if ("opt" == treeNode.subType) {
            return (getOptUrl + "&app_id=" + app_id + "&module_id=" + treeNode.id);
        }
        if ("module" == treeNode.subType) {
            return (getModuleUrl + "&app_id=" + app_id + "&module_id=" + treeNode.id);
        }
    }
}
/**
 * 加载树形结构数据
 */
function onLoadZTree() {
    zTree = $.fn.zTree.init($("#treeDemo"), setting);
}



//节点增删改更新

/*
 * 刷新新增后的节点
 */
function refreshAddNode(pId,nodeData) {
	var parentNode = zTree.getNodeByTId(pId);
	if(parentNode){
		if(parentNode.children==null || parentNode.children.length==0){
			parentNode.isParent = "true";
			if(nodeData.opt_name != null && nodeData.opt_name !=""){
				zTree.reAsyncChildNodes(parentNode,"refresh",false);
			}else{
				zTree.addNodes(parentNode,nodeData);
				zTree.selectNode(parentNode);
			}
		}else{
			zTree.reAsyncChildNodes(parentNode,"refresh",true);
		}
	}
    return true;
}

/*
 * 刷新更新后的节点
 */
function refreshEditNode(tId,nodeData) {
	//var jsonOb = $.parseJSON(nodeData);
	var jsonOb =nodeData;
	var editNode = zTree.getNodeByTId(tId);
	editNode.name = jsonOb.name;
	//editNode.icon = jsonOb.icon;
	editNode.is_leaf = jsonOb.is_leaf;
	editNode.seq = jsonOb.seq;
	editNode.app_id = jsonOb.app_id;
	zTree.updateNode(editNode);
	return true;
}

/*
 * 刷新删除后的节点
 */
function removeNode(tId) {
	var delNode = zTree.getNodeByTId(tId);
	zTree.removeNode(delNode);
	return true;
}
//节点增删改更新


function addDiyDom(treeId, treeNode) {
    //treeNode.append()
    getIconSkin(treeNode);
}


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
function OpenNodeLink(event, treeId, treeNode) {

    switch (treeNode.type) {
        case "root":
            frame.setAttribute("src", appJspUrl + "?sourceId=" + encodeURI(encodeURI(treeNode.id)) + "&treeId=" + treeId + "&level=" + treeNode.level + "&tId=" + treeNode.tId+ "&isParent=" + treeNode.isParent);
            break;
        case "app":
            frame.setAttribute("src", appJspUrl + "?sourceId=" + encodeURI(encodeURI(treeNode.id)) + "&treeId=" + treeId + "&level=" + treeNode.level + "&tId=" + treeNode.tId+ "&isParent=" + treeNode.isParent);
            break;
        case "module":
            var app_id = getNodeAppId(treeNode);

            var parentId = treeNode.getParentNode().id;
            frame.setAttribute("src", moduleJspUrl + "?sourceId=" + treeNode.id + "&treeId=" + treeId + "&app_id=" + app_id + "&level=" + treeNode.level + "&tId=" + treeNode.tId + "&parentId=" + parentId + "&nodeType=" + treeNode.type+ "&isParent=" + treeNode.isParent);
            break;
        case "opt":
            var module_id = treeNode.getParentNode().id;
            var app_id = getNodeAppId(treeNode);
            frame.setAttribute("src", optJspUrl + "?sourceId=" + treeNode.id + "&treeId=" + treeId + "&app_id=" + app_id + "&module_id=" + module_id + "&level=" + treeNode.level + "&tId=" + treeNode.tId + "&nodeType=" + treeNode.type+ "&isParent=" + treeNode.isParent);
            break;
    }
}

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
/**
 * 显示右键菜单
 */
function showRMenu(treeNode, x, y) {
    //根据树层显示菜单

    $("#rMenu ul").show();
    switch (treeNode.level) {
        case 0:
            $("#m_edit").hide();
            $("#m_del").hide();
            $("#m_add").hide();
            $("#m_add_sub").text("添加应用");
            $("#a_add_sub").attr('href', "${fn:getLink('function/appManage.jsp')}?sourceId=" + encodeURI(encodeURI(treeNode.id)) + "&treeid=" + "treeDemo&doFlg=a");
            $("#m_add_sub").show();
            break;
        case 1:
            $("#m_add").text("添加应用");
            $("#a_add").attr('href', "${fn:getLink('function/funcManage.jsp')}");
            $("#m_add_sub").text("添加模块");
            $("#a_add_sub").attr('href', "${fn:getLink('function/funcManage.jsp')}");
            $("#m_edit").text("编辑应用");
            $("#a_edit").attr('href', "${fn:getLink('function/appManage.jsp')}?sourceId=" + encodeURI(encodeURI(treeNode.id)) + "&treeid=" + "treeDemo&doFlg=u");
            $("#m_del").text("删除应用");
            $("#a_del").attr('href', "${fn:getLink('function/funcManage.jsp')}");
            $("#m_add").show();
            $("#m_add_sub").show();
            $("#m_edit").show();
            $("#m_del").show();
            break;
        case 2:
            $("#m_add").text("添加模块");
            $("#a_add").attr('href', "${fn:getLink('function/funcManage.jsp')}");
            $("#m_add_sub").text("添加操作");
            $("#a_add_sub").attr('href', "${fn:getLink('function/funcManage.jsp')}");
            $("#m_edit").text("编辑模块");
            $("#a_edit").attr('href', "${fn:getLink('function/funcManage.jsp')}");
            $("#m_del").text("删除模块");
            $("#a_del").attr('href', "${fn:getLink('function/funcManage.jsp')}");
            $("#m_add").show();
            $("#m_add_sub").show();
            $("#m_edit").show();
            $("#m_del").show();
            break;
        case 3:
            $("#m_add").text("添加操作");
            $("#a_add").attr('href', "${fn:getLink('function/funcManage.jsp')}");
            $("#m_edit").text("编辑操作");
            $("#a_add_sub").attr('href', "${fn:getLink('function/funcManage.jsp')}");
            $("#m_del").text("删除操作");
            $("#a_del").attr('href', "${fn:getLink('function/funcManage.jsp')}");
            $("#m_add").show();
            $("#m_add_sub").hide();
            $("#m_edit").show();
            $("#m_del").show();
            break;

    }

    rMenu.css({"top": y + "px", "left": x + "px", "visibility": "visible"});

    $("body").bind("mousedown", onBodyMouseDown);
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
    var nodes = zTree.getSelectedNodes();
    if (nodes && nodes.length > 0) {
        if (nodes[0].children && nodes[0].children.length > 0) {
            var msg = "要删除的节点是父节点，如果删除将连同子节点一起删掉。\n\n请确认！";
            if (confirm(msg) == true) {
                zTree.removeNode(nodes[0]);
            }
        } else {
            zTree.removeNode(nodes[0]);
        }
    }
}

function zTreeOnNodeCreated(event, treeId, treeNode) {
	//取得节点的图标
//	getIconSkin(treeNode);
//    zTree.updateNode(treeNode);
}

/*
 * 取得节点的图标
 */
function getIconSkin(treeNode) {
//	switch (treeNode.type) {
//	    case "root":
//	    	treeNode.iconSkin = "pIconRoot";
//	        break;
//	    case "app":
//	    	treeNode.iconSkin = "iconApp";
//	        break;
//	    case "module":
//	    	treeNode.iconSkin = "iconModule";
//	        break;
//	    case "opt":
//	    	treeNode.iconSkin = "iconOpt";
//	        break;
//    }
}