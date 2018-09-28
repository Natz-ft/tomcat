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
        onDblClick: OpenNodeLink
        //onExpand: menuTreeOnExpand
    }
};
var cpsetting = {
		async: {
			enable: true,
			type: "post",
			url: getAsyncUrlcp
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
			onClick: setNoteId
		}
};

function setNoteId(event, treeId, treeNode){
	if(treeNode.id=="rootId"){
		layer.msg("请勿操作根节点",1,0);
		return false;
	}
	$("#treeId").val(treeNode.id);
	$("#treeName").val(treeNode.name);
}
/**
 * 打开页面链接
 */
function OpenNodeLink(event, treeId, treeNode) {
	$("#treeParentId").val(treeNode.tId);
	$("#ParentId").val(treeNode.id);
    switch (treeNode.type) {
        case "root":
            frame.setAttribute("src", menuOptionJspUrl + "?sourceId=" + treeNode.id + "&is_leaf=0&pId=" + treeNode.parentTId + "&tId=" + treeNode.tId+ "&nodeType=" + treeNode.type+ "&isParent=" + treeNode.isParent + "&type_value=" + typeValue);
            break;
        case "menu":
            frame.setAttribute("src", menuOptionJspUrl + "?sourceId=" + treeNode.id + "&is_leaf=" + treeNode.is_leaf + "&pId=" + treeNode.parentTId + "&tId=" + treeNode.tId+ "&nodeType=" + treeNode.type+ "&isParent=" + treeNode.isParent+ "&type_value=" + typeValue);
            break;
    }
}

function getAsyncUrl(treeId, treeNode) {
	
    if (!treeNode || "root" == treeNode.type) {
        return (getMenuUrl + "getMenuOptions&type_value=" + typeValue);
    }
    
    //展开应用层的链接
    if ("menu" == treeNode.type) {
        return (getMenuUrl + "getSubMenuList&id=" + treeNode.id + "&type_value=" + typeValue);
    }
}

function getAsyncUrlcp(treeId, treeNode) {
	if (!treeNode || "root" == treeNode.type) {
		return (getMenuUrl + "getMenuOptions&type_value=1");
	}
	
	//展开应用层的链接
	if ("menu" == treeNode.type) {
		 return (getMenuUrl + "getSubMenuList&id=" + treeNode.id + "&type_value=1");
	}
}

/**
 * 加载树形结构数据
 */
function onLoadZTree() {
    menuTree = $.fn.zTree.init($("#menuTree"), setting);
    cpmenuTree = $.fn.zTree.init($("#chosemenuTree"), cpsetting);
}

function onLoadZTreeByType(){
	menuTree = $.fn.zTree.init($("#menuTree"), setting);
}

function resetTree() {
    hideRMenu();
    $.fn.zTree.init($("#menuTree"), setting);
}

// 展开节点数据


function ajaxDataFilter(treeId, parentNode, responseData) {
    if (responseData) {
        for (var i = 0; i < responseData.length; i++) {
            if (responseData[i].type == "root") {
                responseData[i].iconSkin += "pIcon01";
            } else if (responseData[i].type == "app") {
                responseData[i].iconSkin += "icon05";
            } else if (responseData[i].type == "mol") {
                responseData[i].iconSkin += "icon06";
            } else if (responseData[i].type == "opt") {
                responseData[i].iconSkin += "icon07";
            }
            //responseData[i].iconSkin += "_filter";
        }
    }
    return responseData;
};

function addDiyDom(treeId, treeNode) {
    //treeNode.append()
    getIconSkin(treeNode);
}
function getIconSkin(treeNode) {

    switch (treeNode.level) {
        case 0:
            treeNode.iconSkin = "pIcon01";
            break;
        case 1:
            treeNode.iconSkin = "icon05";
            break;
        case 2:
            treeNode.iconSkin = "icon06";
            break;
        case 3:
            treeNode.iconSkin = "icon07";
            break;
        default:
            treeNode.iconSkin = "icon09";
    }
}

/**
 * 右键事件处理
 */
function OnRightClick(event, treeId, treeNode) {
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        menuTree.cancelSelectedNode();
        showRMenu(treeNode, event.clientX, event.clientY);
    } else if (treeNode && !treeNode.noR) {
        menuTree.selectNode(treeNode);
        showRMenu(treeNode, event.clientX, event.clientY);
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
    var nodes = menuTree.getSelectedNodes();
    var selNode;
    if (nodes && nodes.length > 0) {
        selNode = nodes[0]
    }
    //没有任何节点的选中的话，默认根节点选中
    if (!selNode) {
        selNode = menuTree.getNodeByParam("id", "rootId", null);
    }
    return selNode;
}

//节点增删改更新

/*
 * 刷新新增后的节点
 */
function refreshAddNode(pId,nodeData) {
	//var jsonOb = $.parseJSON(nodeData);
	var parentNode = menuTree.getNodeByTId(pId);
	if(parentNode){
		menuTree.addNodes(parentNode,nodeData);
		menuTree.reAsyncChildNodes(parentNode, "refresh",true);
//		menuTree.selectNode(parentNode);
	}
    return true;
}

/*
 * 刷新更新后的节点
 */
function refreshEditNode(tId,nodeData) {
	//var jsonOb = $.parseJSON(nodeData);
	var jsonOb =nodeData;
	var editNode = menuTree.getNodeByTId(tId);
	editNode.name = jsonOb.name;
	editNode.icon = jsonOb.icon;
	editNode.is_leaf = jsonOb.is_leaf;
	editNode.seq = jsonOb.seq;
	editNode.app_id = jsonOb.app_id;
	menuTree.updateNode(editNode);
	return true;
}

/*
 * 刷新删除后的节点
 */
function removeNode(tId) {
	var delNode = menuTree.getNodeByTId(tId);
	menuTree.removeNode(delNode);
	return true;
}
//节点增删改更新

function removeTreeNode() {
    hideRMenu();
    var nodes = menuTree.getSelectedNodes();
    if (nodes && nodes.length > 0) {
        if (nodes[0].children && nodes[0].children.length > 0) {
            var msg = "要删除的节点是父节点，如果删除将连同子节点一起删掉。\n\n请确认！";
            if (confirm(msg) == true) {
                menuTree.removeNode(nodes[0]);
            }
        } else {
            menuTree.removeNode(nodes[0]);
        }
    }
}