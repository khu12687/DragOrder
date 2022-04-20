
var DragOrder = function(selector){ 

    $(() => {

        $(`${selector}`).css("display","flex");
        $(`${selector}`).css("flex-direction","column");

        $(`${selector}`).children().each((index, item) => {
            $(item).attr("draggable", true);
            $(item).attr("data-order", index);
       
            // dragstart
            $(item).on("dragstart", e => {
                console.log(`dragStart: ${e.target.dataset["order"]}`);
    
                // e.target.classList.add("dragStart");
                $(e.target).addClass("dragStart");
    
                e.originalEvent.dataTransfer.setData("text/plain", e.target.dataset["order"]);
            });
    
            // dragenter
            $(item).on("dragenter", e => {
                console.log(`dragEnter: ${e.target.dataset["order"]}`);
    
                $(e.target).addClass("dragOver");
            });
    
            // dragleave
            $(item).on("dragleave", e => {
                console.log(`dragleave: ${e.target.dataset["order"]}`);
    
                $(e.target).removeClass("dragOver");
            });
    
            // dragover
            $(item).on("dragover", e => {
                e.preventDefault();                    
    
                console.log(`dragover: ${e.target.dataset["order"]}`);
            });
    
            $(item).on("dragend", e => {
                // e.target.classList.remove("dragStart");
                $(e.target).removeClass("dragStart");
            });
    
            // drop
            $(item).on("drop", e => {
                e.preventDefault();
    
                console.log(`drop: ${e.target.dataset["order"]}`);                    
    
                $(e.target).removeClass("dragOver");
    
                const source = e.originalEvent.dataTransfer.getData("text/plain");
                const target = e.target.dataset["order"];
    
                console.log(`MOVE: ${source} ===>>> ${target}`);
    
                moveOrder(source, target);
            });
        });           
    });
    
    function moveOrder(source_, target_) {
        const source = parseInt(source_);
        const target = parseInt(target_);
    
        $(`${selector}`).children().each( (index, item) => {
            const order = parseInt(item.dataset["order"]);
    
            if(source < target) {
                if(order == source)
                    item.dataset["order"] = target;
                else if(order > source && order <= target)
                    item.dataset["order"] = order - 1;
            } else {
                if(order == source)
                    item.dataset["order"] = target;
                else if(order < source && order >= target)
                    item.dataset["order"] = order + 1;
            }
        });
    
        $(`${selector}`).children().each((index, item) => {
            item.style.order = item.dataset["order"];
        });

    }
    

}