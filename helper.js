/**
 * Created by work on 1/8/2017.
 */
document.addEventListener("DOMContentLoaded", function(){
    var treeTypeRadios = document.getElementsByName("treeType");
    var prev = treeTypeRadios[0];
    for(var i = 0; i < treeTypeRadios.length; i++) {
        treeTypeRadios[i].onclick = function() {
            //(prev)? console.log(prev.value): null;
            if(this !== prev) {
                prev = this;
                console.log(this.value);
                if(this.value === "plain"){
                    bst = new BinarySearchTree();
                }
                else {
                    bst = new RBTree(function(a, b){
                        return a - b;
                    })
                }
                displayData(bst.prepareD3Tree());
                document.getElementById("treeSize").innerHTML = bst.size();
            };
        }
    }
});
