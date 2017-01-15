/**
 * Created by work on 1/7/2017.
 */
function BinarySearchTree() {
    this._root = null;
};

BinarySearchTree.prototype.prepareD3Tree = function () {
    if (this._root === null)
        return;
    var d3Tree = convertNode(this._root);
    return d3Tree;
};

function convertNode(node) {
    var result = {
        name: node.value
    };
    if (node.left === null && node.right === null)
        return result;
    result.children = [];
    if (node.left !== null) {
        result.children.push(convertNode(node.left));
    } else {
        result.children.push({
            name: "null"
        })
    }

    if (node.right !== null) {
        result.children.push(convertNode(node.right));
    } else {
        result.children.push({
            name: "null"
        })
    }
    return result;
}

BinarySearchTree.prototype.testIfValid = function (value) {
    var parsedValue = parseFloat(value);
    if(isNaN(parsedValue))
    {
        console.error( " 'value'" + " is not a valid number. Please enter a valid number.");
        var errorDivVar = document.getElementById("errorDiv");
        errorDivVar.innerHTML = value + " is not a valid number. Please enter a valid number.";
        return false;
    }
    return true;
}

BinarySearchTree.prototype.add = function (value) {
    if(!this.testIfValid(value))
        return;
    var errorDivVar = document.getElementById("errorDiv");
    errorDivVar.innerHTML = "";
    var node = {
            value: parseFloat(value),
            left: null,
            right: null
        },
        current;
    if (this._root == null) {
        this._root = node;
    } else {
        current = this._root;
        while (true) {
            if (value < current.value) {
                if (current.left == null) {
                    current.left = node;
                    break;
                } else {
                    current = current.left;
                }
            } else if (value > current.value) {
                if (current.right == null) {
                    current.right = node;
                    break;
                } else {
                    current = current.right;
                }
            } else { //if the value is equal to something in the tree already, ignore it
                break;
            }
        }
    }
    console.log(this);
    console.log(this.toString());

};

BinarySearchTree.prototype.contains = function (value) {
    var found = false,
        current = this._root

    while (!found && current) {
        if (value < current.value) {
            current = current.left;
        } else if (value > current.value) {
            current = current.right;
        } else {
            found = true;
        }
    }
    return found;
};

/*
 There are three conditions to worry about when removing a node:
 1. a leaf node
 2. a node with one child
 3. a node with two children
 */
BinarySearchTree.prototype.remove = function (value) {
    if(!this.testIfValid(value))
        return;
    var errorDivVar = document.getElementById("errorDiv");
    errorDivVar.innerHTML = "";
    var found = false,
        parent = null,
        current = this._root,
        childCount,
        replacement,
        replacementParent;
    while (!found && current) { //make sure the node u wanna remove is in there
        if (value < current.value) {
            parent = current;
            current = current.left;
        } else if (value > current.value) {
            parent = current;
            current = current.right;
        } else {
            found = true;
        }
    } //you need to keep track of the parent because you'll need to readjust the parent's child. When found is true, current is the node to remove
    if (found) { // only go on if the node is found
        childCount = (current.left !== null ? 1 : 0) +
            (current.right !== null ? 1 : 0);
        if (current == this._root) {
            switch (childCount) {
                case 0:
                    this._root = null;
                    break;
                case 1:
                    this._root = (current.right == null ? current.left : current.right);
                    break;
                case 2:
                    replacement = this._root.left;
                    while (replacement.right !== null) {
                        replacementParent = replacement;
                        replacement = replacement.right;
                    }
                    if (replacementParent != null) {
                        replacementParent.right = replacement.left;
                        replacement.right = this._root.right;
                        replacement.left = this._root.left;
                    } else {
                        replacement.right = this._root.right;
                    }
                    this._root = replacement;
            }
        } else {
            switch (childCount) {
                case 0:
                    if (current.value < parent.value) {
                        parent.left = null;
                    } else {
                        parent.right = null;
                    }
                    break;
                case 1:
                    if (current.value < parent.value) {
                        parent.left = (current.left === null ? current.right : current.left);
                    } else {
                        parent.right = (current.left === null ? current.right : current.left);
                    }
                    break;
                case 2:
                    replacement = current.left;
                    replacementParent = current;
                    while (replacement.right !== null) {
                        replacementParent = replacement;
                        replacement = replacement.right;
                    }
                    replacementParent.right = replacement.left;
                    replacement.right = current.right;
                    replacement.left = current.left;
                    if (current.value < parent.value) {
                        parent.left = replacement;
                    } else {
                        parent.right = replacement;
                    }
            }
        }
    }
    console.log(this);
    console.log(this.toString());
};

BinarySearchTree.prototype.size = function () {
    var length = 0;
    this.traverse(function (node) {
        length++;
    });
    return length;
};

BinarySearchTree.prototype.toArray = function () {
    var result = [];
    this.traverse(function (node) {
        result.push(node.value);
    });
    return result;
};

BinarySearchTree.prototype.toString = function () {
    return this.toArray().toString();
};

BinarySearchTree.prototype.traverse = function (process) {
    function inOrder(node) {
        if (node) {
            if (node.left !== null) {
                inOrder(node.left);
            }
            process.call(this, node);
            if (node.right !== null) {
                inOrder(node.right);
            }
        }
    }

    inOrder(this._root);
};

BinarySearchTree.prototype.generateD3Structure = function (process) {
    function inOrder(node) {
        if (node) {
            if (node.left !== null) {
                inOrder(node.left);
            }
            process.call(this, node);
            if (node.right !== null) {
                inOrder(node.right);
            }
        }
    }

    inOrder(this._root);
};