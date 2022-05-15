$(document).ready(function () {

    function left_most_block(blocks) {
        let min = blocks[0][1];
        let min_index = 0;
        for (let i = 1; i < blocks.length; i++) {
            if (blocks[i][1] < min) {
                min_index = i;
                min = blocks[i][1];
            }
        }
        return min;
    }

    function right_most_block(blocks) {
        let max = blocks[0][1];
        let max_index = 0;
        for (let i = 1; i < blocks.length; i++) {
            if (blocks[i][1] > max) {
                max_index = i;
                max = blocks[i][1];
            }
        }
        return max;
    }

    function moveLeft(blocks_arr) {
        let matrix = blocks_arr[0];
        let left_most_index = left_most_block([...matrix])
        let colapseLeft = false;
        for (let i = 0; i < matrix.length; i++) {
            var loc = [...matrix[i]];
            loc[1] -= 1;
            let block = loc[0] + "-" + loc[1]
            if (($("#" + block).text() == "1")) {
                colapseLeft = true;
            }
        }
        if (left_most_index - 1 >= 0 && !colapseLeft) {
            for (let i = 0; i < matrix.length; i++) {
                var loc = [...matrix[i]];
                var oldLoc = [...matrix[i]];

                loc[1] -= 1;
                matrix[i] = loc;
                let block1 = matrix[i][0] + "-" + matrix[i][1]
                let oldblock = oldLoc[0] + "-" + (loc[1] + 1);
                $("#" + block1 + "").css("background", blocks_arr[3]);
                $("#" + block1 + "").css("color", blocks_arr[3]);

                $("#" + oldblock + "").css("background", "none");
                $("#" + oldblock + "").css("color", "white");

            }

        }
        return matrix
    }

    function moveRight(blocks_arr) {
        let matrix = blocks_arr[0];
        let right_most_index = right_most_block([...matrix])
        let colapseRight = false;

        for (let i = 0; i < matrix.length; i++) {
            var loc = [...matrix[i]];
            loc[1] += 1;
            let block = loc[0] + "-" + loc[1]
            if (($("#" + block).text() == "1")) {
                colapseRight = true;
            }
        }
        if (right_most_index + 1 <= 9 && !colapseRight) {
            for (let i = matrix.length - 1; i >= 0; i--) {
                var loc = [...matrix[i]];
                var oldLoc = [...matrix[i]];

                loc[1] += 1;
                matrix[i] = loc;
                let block1 = matrix[i][0] + "-" + matrix[i][1]
                let oldblock = oldLoc[0] + "-" + (loc[1] - 1);
                $("#" + block1 + "").css("background", blocks_arr[3]);
                $("#" + block1 + "").css("color", blocks_arr[3]);

                $("#" + oldblock + "").css("background", "none");
                $("#" + oldblock + "").css("color", "white");
            }
        }
        return matrix
    }

    function changeColor(oldBlock, newBlock, color) {
        $("#" + newBlock + "").css("background", color);
        $("#" + newBlock + "").css("color", color);

        if (oldBlock != null) {
            $("#" + oldBlock + "").css("background", "none");
            $("#" + oldBlock + "").css("color", "white");
        }

    }

    function isSettle(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            let loc = matrix[i];
            let nextloc = loc[0] + 1;
            let next = nextloc + "-" + loc[1]
            let nextText = $("#" + next).text();
            if (nextloc > 20 || nextText != "0") {

                return true;

            }
        }
        return false;
    }

    function isDuplicate(array, i) {
        return $("#" + array[i][0] + "-" + array[i][1]).text() === "1" || array[i][0] > 19;
    }

    function checkTurn(array) {
        let dif;
        let backup = JSON.parse(JSON.stringify(array));
        let center = array[4]
        let oldDiff = []
        let oldBlocks = []
        let newBlocks = []
        for (let i = 0; i < array.length - 1; i++) {
            let oldBlock = array[i][0] + "-" + array[i][1];
            oldBlocks.push(oldBlock)
            console.log(oldBlock)
            if (array[i][0] > center[0] && array[i][1] > center[1]) {
                dif = Math.abs(array[i][0] - center[0]) * 2;
                array[i][0] -= dif;
                if (isDuplicate(array, i)) {
                    array[i][0] += dif;
                    for (let j = 0; j < i; j++) {
                        array[j][0] = oldDiff[j][0];
                    }
                    console.log("asdasfgsdhhgfjfgjghkghjkhgjfhgdfgfd")
                    newBlocks = [...oldBlocks]
                    array = backup
                    return false;
                    break;
                }
            } else if (array[i][0] > center[0] && array[i][1] < center[1]) {
                dif = Math.abs(array[i][0] - center[0]) * 2;
                array[i][1] += dif;
                if (isDuplicate(array, i)) {
                    array[i][1] -= dif;
                    for (let j = 0; j < i; j++) {
                        array[j][0] = oldDiff[j][0];
                    }
                    console.log("asdasfgsdhhgfjfgjghkghjkhgjfhgdfgfd")
                    newBlocks = [...oldBlocks]
                    array = backup
                    return false;
                    break;
                }
            } else if (array[i][0] < center[0] && array[i][1] > center[1]) {
                dif = Math.abs(array[i][0] - center[0]) * 2;
                array[i][1] -= dif;
                if (isDuplicate(array, i)) {
                    array[i][1] += dif;
                    for (let j = 0; j < i; j++) {
                        array[j][0] = oldDiff[j][0];
                    }
                    console.log("asdasfgsdhhgfjfgjghkghjkhgjfhgdfgfd")
                    newBlocks = [...oldBlocks]
                    array = backup
                    return false;
                    break;
                }
            } else if (array[i][0] < center[0] && array[i][1] < center[1]) {
                dif = Math.abs(array[i][0] - center[0]) * 2;
                array[i][0] += dif;
                if (isDuplicate(array, i)) {
                    array[i][0] -= dif;
                    for (let j = 0; j < i; j++) {
                        array[j][0] = oldDiff[j][0];
                    }
                    console.log("asdasfgsdhhgfjfgjghkghjkhgjfhgdfgfd")
                    newBlocks = [...oldBlocks]
                    array = backup
                    return false;
                    break;
                }
            } else if (array[i][0] > center[0] && array[i][1] == center[1]) {
                dif = Math.abs(array[i][0] - center[0]);
                array[i][0] -= dif;
                array[i][1] += dif;
                if (isDuplicate(array, i)) {
                    array[i][0] += dif;
                    array[i][1] -= dif;
                    for (let j = 0; j < i; j++) {
                        array[j][0] = oldDiff[j][0];
                        array[j][1] = oldDiff[j][1];
                    }
                    console.log("asdasfgsdhhgfjfgjghkghjkhgjfhgdfgfd")
                    newBlocks = [...oldBlocks]
                    array = backup
                    return false;
                    break;
                }
            } else if (array[i][0] < center[0] && array[i][1] == center[1]) {
                dif = Math.abs(array[i][0] - center[0]);
                array[i][0] += dif;
                array[i][1] -= dif;
                if (isDuplicate(array, i)) {
                    array[i][0] -= dif;
                    array[i][1] += dif;
                    for (let j = 0; j < i; j++) {
                        array[j][0] = oldDiff[j][0];
                        array[j][1] = oldDiff[j][1];
                    }
                    console.log("asdasfgsdhhgfjfgjghkghjkhgjfhgdfgfd")
                    newBlocks = [...oldBlocks]
                    array = backup
                    return false;
                    break;
                }
            } else if (array[i][0] == center[0] && array[i][1] > center[1]) {
                dif = Math.abs(array[i][1] - center[1]);
                array[i][0] -= dif;
                array[i][1] -= dif;
                if (isDuplicate(array, i)) {
                    array[i][0] += dif;
                    array[i][1] += dif;
                    for (let j = 0; j < i; j++) {
                        array[j][0] = oldDiff[j][0];
                        array[j][1] = oldDiff[j][1];
                    }
                    console.log("asdasfgsdhhgfjfgjghkghjkhgjfhgdfgfd")
                    newBlocks = [...oldBlocks]
                    array = backup
                    return false;
                    break;
                }
            } else if (array[i][0] == center[0] && array[i][1] < center[1]) {
                dif = Math.abs(array[i][1] - center[1]);
                array[i][0] += dif;
                array[i][1] += dif;
                if (isDuplicate(array, i)) {
                    array[i][0] -= dif;
                    array[i][1] -= dif;
                    for (let j = 0; j < i; j++) {
                        array[j][0] = oldDiff[j][0];
                        array[j][1] = oldDiff[j][1];
                    }
                    console.log("asdasfgsdhhgfjfgjghkghjkhgjfhgdfgfd")
                    newBlocks = [...oldBlocks]
                    array = backup
                    return false;
                    break;
                }
            }
            oldDiff.push([array[i][0], array[i][1]])
            newBlocks.push(array[i][0] + "-" + array[i][1]);
            console.log(array[i][0] + "=======" + array[i][1]);
        }
        return [oldBlocks, newBlocks, array]
    }

    function turn(blocks_arr) {
        let array = [...blocks_arr[0]];
        let center = array[4]
        console.log(center[0] + "-" + center[1] + "*******")
        console.log(center[1] == 9)
        if (center[1] == 9) {
            array = moveLeft(array)

        } else if (center[1] == 0) {
            array = moveRight(array)
            if (blocks_arr[1] == 2)
                array = moveRight(array)
        }
        let isCheck = checkTurn(array);
        let count = 0;
        let clone = []
        for (let i = 0; i < 4; i++) {
            clone[i] = array[i];
        }
        if (isCheck != false) {
            // changeColor(isCheck[0][i], isCheck[1][i], blocks_arr[3])
            for (let i = 0; i < array.length; i++) {
                changeColor(isCheck[0][i], isCheck[1][i], blocks_arr[3])
            }
            // clone = isCheck[2]
        }

        clone.sort(compare);
        clone[4] = array[4]
        // alert(clone[4])

        changeColor(null, clone[4][0] + "-" + clone[4][1], blocks_arr[3])
        blocks_arr[0] = clone;
    }

    function compare(a, b) {
        if (a[0] == b[0]) {
            return a[1] - b[i];
        } else {
            return a[0] - b[0];
        }


    }


    function drop(blocks_arr) {

        let matrix = blocks_arr[0]
        if (!isSettle(matrix)) {
            let oldblock = []
            let block1 = []
            for (let i = 0; i < matrix.length; i++) {
                var loc = [...matrix[i]];
                var oldLoc = [...matrix[i]];
                loc[0] += 1;
                matrix[i] = loc;
                block1.push(matrix[i][0] + "-" + matrix[i][1]);
                oldblock.push((loc[0] - 1) + "-" + oldLoc[1]);
            }
            for (let i = 0; i < matrix.length; i++) {

                $("#" + oldblock[i] + "").css("background", "none");
                $("#" + oldblock[i] + "").css("color", "white");

            }
            for (let i = 0; i < matrix.length; i++) {
                $("#" + block1[i] + "").css("background", blocks_arr[3]);
                $("#" + block1[i] + "").css("color", blocks_arr[3]);

            }
            blocks_arr[2] = matrix[4];
            for (let i = 0; i < matrix.length; i++) {
                let oldBlock = matrix[i][0] + "-" + matrix[i][1];
                // console.log(oldBlock)

            }
            // console.log("++++++++++++++++++++++++++++++++++++")
        }
    }

    function rewardChecking() {
        for (let i = 0; i < 20; i++) {
            let sum = 0;
            for (let j = 0; j < 10; j++) {
                idname = i + "-" + j
                sum += parseInt($("#" + idname).text());
            }
            if (sum == 10) {
                point += 100;
                $(".point").text(point);
                for (let k = i - 1; k >= 0; k--) {
                    for (let j = 0; j < 10; j++) {
                        idname = (k + 1) + "-" + j;
                        let idUpName = k + "-" + j;
                        let background = $("#" + idUpName).css("background");
                        let txt = $("#" + idUpName).text();
                        let color = $("#" + idUpName).css("color");
                        $("#" + idname).css("background", background);
                        $("#" + idname).text(txt);
                        $("#" + idname).css("color", color);

                    }
                }
            }
        }
    }

    //
    function centerBlock(blocks, index) {
        let center;
        switch (index) {
            case 0:
                center = blocks[4];
                break;
            case 1:
                center = blocks[4];
                break;
            case 2:
                center = blocks[4];
                break;
            case 3:

                break;
            case 4:
                center = blocks[4];
                break;
            case 5:
                center = blocks[4];
                break;
        }
        return center;
    }

    // let l = [[2, 4], [1, 4], [0, 4], [2, 5]]
    // let rl = [[2, 4], [2, 5], [1, 5], [0, 5]]
    // let long = [[3, 5], [2, 5], [1, 5], [0, 5]]
    // let square = [[1, 4], [1, 5], [0, 4], [0, 5]]
    // let t = [[1, 4], [1, 5], [1, 6], [0, 5]]
    let l = [[-1, 4], [-2, 4], [-3, 4], [-1, 5], [-2, 4]]
    let rl = [[-1, 4], [-1, 5], [-2, 5], [-3, 5], [-2, 5]]
    let long = [[0, 5], [-1, 5], [-2, 5], [-3, 5], [-1, 5]]
    let square = [[-2, 4], [-2, 5], [-3, 4], [-3, 5]]
    let t = [[-2, 4], [-2, 5], [-2, 6], [-3, 5], [-2, 5]]
    let z = [[-2, 4], [-2, 5], [-3, 5], [-3, 6], [-2, 5]]
    let type = [l, rl, long, square, t, z];
    let images=[['images/l.PNG','40px','60px'],['images/rl.PNG','40px','60px'],['images/dai.PNG','20px','80px']
        ,['images/square.PNG','40px','40px'],['images/T.PNG','60px','40px'],['images/z.PNG','60px','40px']]
    let color = ["red", "green", "blue", "yellow", "purple", "orange"]
    var blocks_arr = [];
    var won = false;
    var nextBlock=Math.floor(Math.random() * 6);
    function make_playground() {
        $("#main").prepend('<div  id="playground"></div>')
        $("#main").prepend('<div class="banner" > </div>')
        let idname = "";
        for (let i = 0; i < 23; i++) {
            for (let j = 0; j < 10; j++) {
                idname = (i - 3) + "-" + j
                if (i < 3) {
                    $("#playground").append('<div class="small-block-non-border" id="' + idname + '">0</div>')
                } else {
                    $("#playground").append('<div class="small-block" id="' + idname + '">0</div>')

                }
            }
        }
    }

    function makeBlock(nextBlock) {
        var arr = [...type[nextBlock]];
        let id = 0;
        var c = 1;

        blocks_arr[0] = arr;
        blocks_arr[1] = nextBlock;
        blocks_arr[2] = centerBlock(blocks_arr[0], blocks_arr[1])
        blocks_arr[3] = color[nextBlock];
        var b = blocks_arr[0];
        for (let i = 0; i < b.length; i++) {
            changeColor(null, b[i][0] + "-" + b[i][1], blocks_arr[3]);
        }
        return blocks_arr
    }

    function setNextImg(nextBlock){
        $('.next-img').attr('src',images[nextBlock][0]);
        $('.next-img').css('width',images[nextBlock][1]);
        $('.next-img').css('height',images[nextBlock][2]);
    }

    var i = 1;
    var point = 0;
    $(document).keydown(function (e) {
        b = blocks_arr[0];
        switch (e.which) {
            case 37: // left
                moveLeft(blocks_arr)
                break;

            case 38: // up
                turn(blocks_arr)
                break;

            case 39: // right
                moveRight(blocks_arr)
                break;

            case 40: // down
                drop(blocks_arr);
                break;
            case 32:
                while (!isSettle(blocks_arr[0])) {
                    drop(blocks_arr)
                }
        }
    });
    $(".start").click(function () {
        point = 0;
        $("#mainMenu").css("display", "none");
        make_playground();
        makeBlock(nextBlock)
        nextBlock=Math.floor(Math.random() * 6);
        setNextImg(nextBlock)
        let c = 0;
        myLoop(blocks_arr[0], c);

    })
    $(".dialog_mainmenu").click(function () {
        $("#dialog").css("display", "none");
        $("#mainMenu").css("display", "block");
    })
    $(".restart").click(function () {
        $("#dialog").css("display", "none");
        $("#win_dialog").css("display", "none");
        point = 0;
        make_playground();
        makeBlock(nextBlock)
        nextBlock=Math.floor(Math.random() * 6);
        setNextImg(nextBlock)
        let c = 0;
        myLoop(blocks_arr[0], c);
    })

    function myLoop(b, c) {
        b = blocks_arr[0];

        setTimeout(function () {
            // console.log("+++++++++")
            // console.log(b)
            // console.log(b.block_matrix[1])
            if (!isSettle(b)) {
                drop(blocks_arr)
            } else {

                for (let i = 0; i < blocks_arr[0].length; i++) {
                    let block1 = blocks_arr[0][i][0] + "-" + blocks_arr[0][i][1];
                    $("#" + block1 + "").text("1");
                }
                makeBlock(nextBlock)
                nextBlock=Math.floor(Math.random() * 6);
                setNextImg(nextBlock)
                if (isSettle(blocks_arr[0])) {
                    c = 1000;
                }

                // console.log(blocks_arr.length + "***********************")
                rewardChecking();
                if (point >= 1000) {
                    c = 1000;
                    won = true;
                }
            }


            c++;
            if (c < 1000) {
                myLoop(b, c);
            } else {
                if (won) {
                    $("#win_dialog").css("display", "block");
                    $("#playground").remove();
                } else {
                    $("#dialog").css("display", "block");
                    $("#playground").remove();
                }
            }
        }, 500)

    }

});