$(document).ready(function () {
    //xác định khối bên trái cùng để xác định tránh va chạm khi di chuyển sang trái
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
//xác định khối bên phải cùng để xác định tránh va chạm khi di chuyển sang phải
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
//di chuyển khối gạch sang trái
    function moveLeft(blocks_arr) {
        let matrix = blocks_arr[0];
        let left_most_index = left_most_block([...matrix])
        let colapseLeft = false;
        for (let i = 0; i < matrix.length; i++) {
            var loc = [...matrix[i]];
            loc[1] -= 1;
            let block = loc[0] + "-" + loc[1]
            if (($("#" + block).text() == "1") || ($("#" + block).text() == "3")) {
                colapseLeft = true;
            }
        }


        if (left_most_index - 1 >= 0 && !colapseLeft) {
            if (matrix.length > 4) {
                var loc = [...matrix[4]];
                var oldLoc = [...matrix[4]];
                loc[1] -= 1;
                matrix[4] = loc;
                let block1 = matrix[4][0] + "-" + matrix[4][1]
                let oldblock = oldLoc[0] + "-" + (loc[1] + 1);
                changeColor(oldblock, block1, blocks_arr[3])
            }
            for (let i = 0; i < 4; i++) {
                var loc = [...matrix[i]];
                var oldLoc = [...matrix[i]];

                loc[1] -= 1;
                matrix[i] = loc;
                let block1 = matrix[i][0] + "-" + matrix[i][1]
                let oldblock = oldLoc[0] + "-" + (loc[1] + 1);
                changeColor(oldblock, block1, blocks_arr[3])
            }


        }
        return matrix
    }
//di chuyển khối gạch sang phải
    function moveRight(blocks_arr) {
        let matrix = blocks_arr[0];
        let right_most_index = right_most_block([...matrix])
        let colapseRight = false;

        for (let i = 0; i < matrix.length; i++) {
            var loc = [...matrix[i]];
            loc[1] += 1;
            let block = loc[0] + "-" + loc[1]
            if (($("#" + block).text() == "1") || ($("#" + block).text() == "3")) {
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
                changeColor(oldblock, block1, blocks_arr[3])

            }
        }
        return matrix
    }
    // thay đổi màu trên playground khi khối gạch thay đổi vị trí
    function changeColor(oldBlock, newBlock, color) {
        $("#" + newBlock + "").css("background", color);
        $("#" + newBlock + "").css("color", color);

        if (oldBlock != null) {
            $("#" + oldBlock + "").css("background", "none");
            $("#" + oldBlock + "").css("color", "#f4f1ec");
        }

    }
    // kiểm tra xem khối gạch đã đáp hay chưa
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
    //kiểm tra khối gạch đã đáp hay chưa dùng cho khối gạch đi lên ơ level 6

     function isSettle2(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            let loc = matrix[i];
            let nextloc = loc[0] - 1;
            let next = nextloc + "-" + loc[1]
            let nextText = $("#" + next).text();
            if (nextText != "0") {

                return true;

            }
        }
        return false;
    }

    var max_row = 20
    //kiểm tra khối vuông khi thay đổi vị trí có bị đè lên khối gạch hay tường hay không
    function isDuplicate(array, i) {
        return $("#" + array[i][0] + "-" + array[i][1]).text() === "1" || $("#" + array[i][0] + "-" + array[i][1]).text() === "3" || array[i][0] > (max_row - 1) || array[i][1] < 0 || array[i][1] > 9;
    }
    //kiểm tra khối gạch có thay đổi va chạm với khối gạch khác hay tường khi quay
    function checkTurn(array) {
        let dif;

        let center = array[4]
        let oldDiff = []
        let oldBlocks = []
        let newBlocks = []
        for (let i = 0; i < array.length - 1; i++) {

            let oldBlock = array[i][0] + "-" + array[i][1];
            oldBlocks.push(oldBlock)
            oldDiff.push([array[i][0], array[i][1]])
            console.log(oldBlock)
            if (array[i][0] > center[0] && array[i][1] > center[1]) {
                dif = Math.abs(array[i][0] - center[0]) * 2;
                array[i][0] -= dif;
                if (isDuplicate(array, i)) {
                    array[i][0] += dif;
                    for (let j = 0; j < i; j++) {
                        array[j][0] = oldDiff[j][0];
                    }
                    console.log("duplicate")
                    return false;
                }
            } else if (array[i][0] > center[0] && array[i][1] < center[1]) {
                dif = Math.abs(array[i][0] - center[0]) * 2;
                array[i][1] += dif;
                if (isDuplicate(array, i)) {
                    array[i][1] -= dif;
                    for (let j = 0; j < i; j++) {
                        array[j][0] = oldDiff[j][0];
                        array[j][1] = oldDiff[j][1];
                    }
                    console.log("duplicate")
                    return false;

                }
            } else if (array[i][0] < center[0] && array[i][1] > center[1]) {
                dif = Math.abs(array[i][0] - center[0]) * 2;
                array[i][1] -= dif;
                if (isDuplicate(array, i)) {
                    array[i][1] += dif;
                    for (let j = 0; j < i; j++) {
                        array[j][0] = oldDiff[j][0];
                        array[j][1] = oldDiff[j][1];
                    }
                    console.log("duplicate")
                    return false;
                }
            } else if (array[i][0] < center[0] && array[i][1] < center[1]) {
                dif = Math.abs(array[i][0] - center[0]) * 2;
                array[i][0] += dif;
                if (isDuplicate(array, i)) {
                    array[i][0] -= dif;
                    for (let j = 0; j < i; j++) {
                        array[j][0] = oldDiff[j][0];
                        array[j][1] = oldDiff[j][1];
                    }
                    console.log("duplicate")
                    return false;
                }
            } else if (array[i][0] > center[0] && array[i][1] < center[1]) {
                dif = Math.abs(array[i][0] - center[0]) * 2;
                array[i][1] += dif;
                if (isDuplicate(array, i)) {
                    array[i][1] -= dif;
                    for (let j = 0; j < i; j++) {
                        array[j][0] = oldDiff[j][0];
                        array[j][1] = oldDiff[j][1];
                    }
                    console.log("duplicate")
                    return false;
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
                    console.log("duplicate")
                    return false;
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
                    console.log("duplicate")
                    return false;
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
                    console.log("duplicate")
                    return false;
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
                    console.log("duplicate")
                    return false;
                }
            }
            newBlocks.push(array[i][0] + "-" + array[i][1]);
        }
        return [oldBlocks, newBlocks, array]
    }
    //quay khối gạch
    function turn(blocks_arr) {
        let array = [...blocks_arr[0]];
        let isCheck = checkTurn(array);
        let clone = []
        for (let i = 0; i < 4; i++) {
            clone[i] = array[i];
        }
        if (isCheck != false) {
            for (let i = 0; i < array.length; i++) {
                $("#" + isCheck[1][i] + "").css("background", blocks_arr[3]);
                $("#" + isCheck[1][i] + "").css("color", blocks_arr[3]);
                if (isCheck[0][i] != null && !isCheck[1].includes(isCheck[0][i])) {
                    $("#" + isCheck[0][i] + "").css("background", "none");
                    $("#" + isCheck[0][i] + "").css("color", "#f4f1ec");
                }
            }
        }
        clone.sort(compare);
        clone[4] = array[4]
        changeColor(null, clone[4][0] + "-" + clone[4][1], blocks_arr[3])
        blocks_arr[0] = clone;
    }
    // so sanh để có thể sắp xếp thứ tự khối vuông trong mảng vị trí khối vuông của khối gạch
    function compare(a, b) {
        if (a[0] == b[0]) {
            return a[1] - b[i];
        } else {
            return a[0] - b[0];
        }


    }
    //di chuyển khối gạch lên trên
    function moveUp(blocks_arr) {
        let matrix = blocks_arr[0]
        if (!isSettle2(matrix)) {
            let oldblock = []
            let block1 = []
            for (let i = 0; i < matrix.length; i++) {
                var loc = [...matrix[i]];
                var oldLoc = [...matrix[i]];
                loc[0] -= 1;
                matrix[i] = loc;
                block1.push(matrix[i][0] + "-" + matrix[i][1]);
                oldblock.push((loc[0] + 1) + "-" + oldLoc[1]);
            }
            for (let i = 0; i < matrix.length; i++) {
                $("#" + oldblock[i] + "").css("background", "none");
                $("#" + oldblock[i] + "").css("color", "#f4f1ec");
            }
            for (let i = 0; i < matrix.length; i++) {
                $("#" + block1[i] + "").css("background", blocks_arr[3]);
                $("#" + block1[i] + "").css("color", blocks_arr[3]);

            }
            blocks_arr[2] = matrix[4];
            for (let i = 0; i < matrix.length; i++) {
                let oldBlock = matrix[i][0] + "-" + matrix[i][1];
            }
        }
    }
    //di chuyển khối gạch xuống dưới
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
                $("#" + oldblock[i] + "").css("color", "#f4f1ec");
            }
            for (let i = 0; i < matrix.length; i++) {
                $("#" + block1[i] + "").css("background", blocks_arr[3]);
                $("#" + block1[i] + "").css("color", blocks_arr[3]);

            }
            blocks_arr[2] = matrix[4];
            for (let i = 0; i < matrix.length; i++) {
                let oldBlock = matrix[i][0] + "-" + matrix[i][1];
            }
        }
    }
    //kiểm tra xem có hàng nào được lấp đầy hay chưa
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
                $('#line')[0].play();
            }
        }
    }
//kiểm tra xem có hàng nào được lấp đầy hay chưa cho level 6
    function rewardChecking_level6() {
        for (let i = 0; i < 20; i++) {
            let sum = 0;
            for (let j = 0; j < 10; j++) {
                idname = i + "-" + j
                sum += parseInt($("#" + idname).text());
            }
            if (sum == 10) {
                point += 100;
                $(".point").text(point);
                if (i < 10) {
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
                } else if (i > 10) {
                    for (let k = i + 1; k < 20; k++) {
                        for (let j = 0; j < 10; j++) {
                            idname = (k - 1) + "-" + j;
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
    }
//kiểm tra xem có hàng nào được lấp đầy hay chưa cho level 5
    function rewardChecking_level5() {
        var color_arr = []
        var c = "";
        for (let i = 0; i < 20; i++) {
            let sum = 0;
            for (let j = 0; j < 10; j++) {
                idname = i + "-" + j
                sum += parseInt($("#" + idname).text());
                c = $("#" + i + "-" + j).css("color");
                if (!color_arr.includes(c, 0)) {
                    color_arr.push(c);
                }
            }
            if (sum == 10) {
                console.log(color_arr.length)
                if (color_arr.length > 2) {
                    for (let j = 0; j < 10; j++) {
                        $("#" + i + "-" + j + "").css("background", "grey");
                        $("#" + i + "-" + j + "").text("3");
                        $("#" + i + "-" + j + "").css("color", "grey");
                    }
                } else {
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
            color_arr = []
        }
    }
    //xác định khối trung tâm phục vụ cho việc xoay khối gạch
    function centerBlock(blocks, index) {
        let center;
        switch (index) {

            case 3:
                center = blocks[4];
                break;
            default:
                center = blocks[4];

        }
        return center;
    }
    //tạo hàng xám
    function concreteLine(blocks_arr) {
        for (let k = 1; k < 20; k++) {
            for (let j = 0; j < 10; j++) {
                idname = (k - 1) + "-" + j;
                let idDownName = k + "-" + j;
                let background = $("#" + idDownName).css("background");
                let txt = $("#" + idDownName).text();
                let color = $("#" + idDownName).css("color");
                $("#" + idname).css("background", background);
                $("#" + idname).text(txt);
                $("#" + idname).css("color", color);

            }
        }
        for (let j = 0; j < 10; j++) {
            $("#" + 19 + "-" + j + "").css("background", "grey");
            $("#" + 19 + "-" + j + "").text("3");
            $("#" + 19 + "-" + j + "").css("color", "grey");
        }
        moveUp(blocks_arr);


    }

    var seconds = 0
    //bộ đếm thời gian
    function incrementSeconds() {
        seconds += 1;
        $(".counting").text(seconds);

    }

    setInterval(incrementSeconds, 1000);

    //xóa ô vuông nhỏ ở level2
    function boombing() {
        while (true) {
            var x = Math.floor(Math.random() * 9);
            var y = Math.floor(Math.random() * 19);
            if ($("#" + y + "-" + x + "").text() == "1" && $("#" + y + "-" + x + "").css("background") != "none") {
                $("#" + y + "-" + x + "").text("0");
                $("#" + y + "-" + x + "").css("background", "none");
                $("#" + y + "-" + x + "").css("color", "#f4f1ec");
                break;
            }
        }
    }

    var barrier = []
    var isBarrier = false;
    var timeBarrier = 0;
    // tạo rào chắn ở level4
    function makeBarrier() {
        var currentHeight = blocks_arr[0][4][0] + 3;
        var side = 0
        var sum = 0
        if (blocks_arr[0][4][1] >= 5)
            side = 1;
        else side = 0;
        if (side == 0) {
            for (let j = 0; j < 5; j++) {
                sum += parseInt($("#" + currentHeight + "-" + j + "").text());
            }
            if (sum == 0) {
                for (let j = 0; j < 5; j++) {
                    $("#" + currentHeight + "-" + j + "").css("background", "grey");
                    $("#" + currentHeight + "-" + j + "").text("3");
                    $("#" + currentHeight + "-" + j + "").css("color", "grey");
                    barrier.push([currentHeight, j])
                }
            }
        } else {
            for (let j = 0; j < 5; j++) {
                sum += parseInt($("#" + currentHeight + "-" + j + "").text());
            }
            if (sum == 0) {
                for (let j = 5; j < 10; j++) {
                    $("#" + currentHeight + "-" + j + "").css("background", "grey");
                    $("#" + currentHeight + "-" + j + "").text("3");
                    $("#" + currentHeight + "-" + j + "").css("color", "grey");
                    barrier.push([currentHeight, j])
                }
            }
        }
        isBarrier = true;
        timeBarrier = seconds;

    }
    // tạo rào chắn ở level4
    function deleteBarrier() {
        for (let i = 0; i < barrier.length; i++) {
            $("#" + barrier[i][0] + "-" + barrier[i][1] + "").css("background", "none");
            $("#" + barrier[i][0] + "-" + barrier[i][1] + "").text("0");
            $("#" + barrier[i][0] + "-" + barrier[i][1] + "").css("color", "#f4f1ec");
        }
        isBarrier = false
        barrier = []
    }

    var timeout;
    var c = 0;
    // mỗi loại khối gạch có ma trận vị trí riêng
    //thứ tự khối vuông trong mỗi khối gạch được xắp sếp: trái->phải;dưới->trên
    let l = [[-1, 4], [-2, 4], [-3, 4], [-1, 5], [-2, 4]]
    let rl = [[-1, 4], [-1, 5], [-2, 5], [-3, 5], [-2, 5]]
    let long = [[0, 5], [-1, 5], [-2, 5], [-3, 5], [-1, 5]]
    let square = [[-2, 4], [-2, 5], [-3, 4], [-3, 5], [-2, 5]]
    let t = [[-2, 4], [-2, 5], [-2, 6], [-3, 5], [-2, 5]]
    let z = [[-2, 4], [-2, 5], [-3, 5], [-3, 6], [-2, 5]]
    let type = [l, rl, long, square, t, z];
    let images = [['images/l.PNG', '40px', '60px'], ['images/rl.PNG', '40px', '60px'], ['images/dai.PNG', '20px', '80px'], ['images/square.PNG', '40px', '40px'], ['images/T.PNG', '60px', '40px'], ['images/z.PNG', '60px', '40px']]
    let color = ["red", "green", "blue", "yellow", "purple", "orange"]
    let tutorial = ['images/LEVEL1TUTORIAL.png', 'images/LEVEL2TUTORIAL.png', 'images/LEVEL3TUTORIAL.png', 'images/LEVEL4TUTORIAL.png', 'images/LEVEL5TUTORIAL.png', 'images/LEVEL6TUTORIAL.png',]
    var blocks_arr = [];
    var blocks_arr2 = [];
    var won = false;
    var nextBlock = Math.floor(Math.random() * 6);
    var nextBlock2 = Math.floor(Math.random() * 6);
    var currentLevel = "main"
    //tạo khu vục chơi
    function make_playground() {
        $("#main").prepend('<div  id="playground"></div>')
        $("#main").prepend('<div class="banner" ><img class="image-banner" src="images/tetris logo.jpg"> </div>')
        let idname = "";
        for (let i = 0; i < 23; i++) {
            for (let j = 0; j < 10; j++) {
                idname = (i - 3) + "-" + j
                if (i < 3) {
                    $("#playground").append('<div class="small-block" id="' + idname + '" >0</div>')
                } else {
                    $("#playground").append('<div class="small-block" id="' + idname + '" style="background: none">0</div>')

                }
            }
        }

    }
    //tạo khu vực chơi cho tầng 6
    function make_playground2() {

        $("#main").prepend('<div  id="playground"></div>')
        $("#playground").css("height", "540px");
        $("#main").prepend('<div class="banner" ><img class="image-banner" src="images/tetris logo.jpg"> </div>')
        $("#main").append('<div class="banner-bottom" ><img class="image-banner" src="images/tetris logo.jpg"> </div>')
        let idname = "";
        for (let i = 0; i < 27; i++) {
            for (let j = 0; j < 10; j++) {
                idname = (i - 3) + "-" + j
                if (i < 3 || i > 23) {
                    $("#playground").append('<div class="small-block" id="' + idname + '" >0</div>')
                } else {
                    $("#playground").append('<div class="small-block" id="' + idname + '" style="background: none">0</div>')
                }
            }
        }
        for (let j = 0; j < 10; j++) {
            $("#" + 10 + "-" + j + "").css("background", "grey");
            $("#" + 10 + "-" + j + "").text("3");
            $("#" + 10 + "-" + j + "").css("color", "grey");
        }

    }
    //tạo khối gạch
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
//tạo khối gạch thứ 2
    function makeBlock2(nextBlock) {
        var arr = [...type[nextBlock]];
        var arr2 = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
        let id = 0;
        var c = 1;
        for (let i = 0; i < arr.length; i++) {
            arr2[i][0] = arr[i][0] + 24;
            arr2[i][1] = arr[i][1];
        }
        blocks_arr2[0] = arr2;
        blocks_arr2[1] = nextBlock;
        blocks_arr2[2] = centerBlock(blocks_arr2[0], blocks_arr2[1])
        blocks_arr2[3] = color[nextBlock];
        var b = blocks_arr2[0];
        for (let i = 0; i < b.length; i++) {
            changeColor(null, b[i][0] + "-" + b[i][1], blocks_arr2[3]);
        }
        return blocks_arr2
    }
    //set ảnh cho khối gạch tiếp theo ở phần thông tin
    function setNextImg(nextBlock) {
        $('.next-img').attr('src', images[nextBlock][0]);
        $('.next-img').css('width', images[nextBlock][1]);
        $('.next-img').css('height', images[nextBlock][2]);
    }
//set ảnh cho khối gạch thứ 2 tiếp theo ở phần thông tin
    function setNextImg2(nextBlock2) {
        $('.next-img2').attr('src', images[nextBlock2][0]);
        $('.next-img2').css('width', images[nextBlock2][1]);
        $('.next-img2').css('height', images[nextBlock2][2]);
    }

    var i = 1;
    var point = 0;
    //tương tác di chuyển khối gạch
    $(document).keydown(function (e) {
        switch (e.which) {
            case 37: // left
                if (currentLevel == "level4")
                    moveRight(blocks_arr)
                else
                    moveLeft(blocks_arr)
                if (currentLevel == "level6")
                    moveLeft(blocks_arr2)
                break;

            case 38: // up
                if (currentLevel == "level4")
                    drop(blocks_arr);
                else
                    turn(blocks_arr)
                if (currentLevel == "level6")
                    turn(blocks_arr2)
                $("#select")[0].play();
                break;

            case 39: // right
                if (currentLevel == "level4")
                    moveLeft(blocks_arr)
                else
                    moveRight(blocks_arr)

                if (currentLevel == "level6")
                    moveRight(blocks_arr2)
                break;

            case 40: // down
                if (currentLevel == "level4")
                    turn(blocks_arr)
                else
                    drop(blocks_arr);
                if (currentLevel == "level6")
                    moveUp(blocks_arr2)
                $("#softdrop")[0].play();
                break;
            case 32:
                e.preventDefault();
                while (!isSettle(blocks_arr[0])) {
                    drop(blocks_arr)
                }
                drop(blocks_arr)
                if (currentLevel == "level6")
                    while (!isSettle2(blocks_arr2[0])) {
                        moveUp(blocks_arr2)
                    }
                $("#harddrop")[0].play();
        }
    });
    var block_list = []
    //next level khi hoàn thành màn chơi
    $(".nextLevel").click(function () {
        if (currentLevel == "level6") {
            $("#win_dialog").css("display", "none");
            $("#mainMenu").css("display", "block");
            $(".restart-right").css("display", "none");
            $(".is-img").attr('src', "images/WELCOME.png");
            $(".banner-bottom").remove();
        } else {
            $("#win_dialog").css("display", "none");
            point = 0;
            $(".point").text(point);
            let index = parseInt(currentLevel.charAt(5));
            index++;
            currentLevel = currentLevel.substring(0, 5) + index;
            $("#mainMenu").css("display", "none");
            $(".restart-right").css("display", "inline");
            $(".dialog_mainmenu-right").css("display", "inline");
            if (currentLevel == 'level6') {
                make_playground2();
                makeBlock2(nextBlock2);
                makeBlock(nextBlock)
                block_list[0] = blocks_arr[0]
                block_list[1] = blocks_arr2[0]
            } else {
                make_playground();
                makeBlock(nextBlock)
                block_list[0] = blocks_arr[0]
            }


            nextBlock = Math.floor(Math.random() * 6);
            setNextImg(nextBlock)
            if (currentLevel == 'level6') {
                nextBlock2 = Math.floor(Math.random() * 6);
                setNextImg2(nextBlock2)
            }
            $(".is-img").attr('src', tutorial[index - 1]);
            play(currentLevel, block_list)
        }
    });
    //tường tác chọn level
    $(".level").click(function () {
        point = 0;
        $(".point").text(point);
        currentLevel = $(this).attr('id');
        let index = parseInt(currentLevel.charAt(5));
        $("#mainMenu").css("display", "none");
        $(".restart-right").css("display", "inline");
        $(".dialog_mainmenu-right").css("display", "inline");
        if (currentLevel == 'level6') {
            make_playground2();
            makeBlock2(nextBlock2);
            makeBlock(nextBlock)
            block_list[0] = blocks_arr[0]
            block_list[1] = blocks_arr2[0]
        } else {
            make_playground();
            makeBlock(nextBlock)
            block_list[0] = blocks_arr[0]
        }


        nextBlock = Math.floor(Math.random() * 6);
        setNextImg(nextBlock)
        if (currentLevel == 'level6') {
            nextBlock2 = Math.floor(Math.random() * 6);
            setNextImg2(nextBlock2)
        }
        $(".is-img").attr('src', tutorial[index - 1]);
        play(currentLevel, block_list)

    })


    $(".dialog_mainmenu").click(function () {
        $("#dialog").css("display", "none");
        $("#mainMenu").css("display", "block");
        $(".restart-right").css("display", "none");
        $(".is-img").attr('src', "images/WELCOME.png");
    })
    $(".dialog_mainmenu-right").click(function () {
        $(".banner-bottom").remove();
        clearTimeout(timeout);
        $("#playground").remove();
        $("#dialog").css("display", "none");
        $("#mainMenu").css("display", "block");
        $(".restart-right").css("display", "none");
        $(".dialog_mainmenu-right").css("display", "none");
        $(".is-img").attr('src', "images/WELCOME.png");
    })

    //tường tác chơi lại
    $(".restart ").click(function () {
        $("#dialog").css("display", "none");
        $("#win_dialog").css("display", "none");
        point = 0;
        $(".point").text(point);
        if (currentLevel == 'level6') {

            make_playground2();
            makeBlock2(nextBlock2);
            makeBlock(nextBlock)
            block_list[0] = blocks_arr[0]
            block_list[1] = blocks_arr2[0]
        } else {
            make_playground();
            makeBlock(nextBlock)
            block_list[0] = blocks_arr[0]
        }


        nextBlock = Math.floor(Math.random() * 6);
        setNextImg(nextBlock)
        play(currentLevel, block_list)
    })
    $(".restart-right").click(function () {
        $(this).css("display", "none");
        $(this).css("display", "inline");
        clearTimeout(timeout);
        $("#dialog").css("display", "none");
        $("#win_dialog").css("display", "none");
        point = 0;
        $(".point").text(point);
        $("#playground").remove();
        if (currentLevel == 'level6') {

            make_playground2();
            makeBlock2(nextBlock2);
            makeBlock(nextBlock)
            block_list[0] = blocks_arr[0]
            block_list[1] = blocks_arr2[0]
        } else {
            make_playground();
            makeBlock(nextBlock)
            block_list[0] = blocks_arr[0]
        }


        nextBlock = Math.floor(Math.random() * 6);
        setNextImg(nextBlock)
        play(currentLevel, block_list)
    })


    //level 1
    function level1(b, c) {
        b = blocks_arr[0];

        timeout = setTimeout(function () {
            console.log(c)
            if (!isSettle(b)) {
                drop(blocks_arr)
            } else {

                for (let i = 0; i < blocks_arr[0].length; i++) {
                    let block1 = blocks_arr[0][i][0] + "-" + blocks_arr[0][i][1];
                    $("#" + block1 + "").text("1");
                }
                makeBlock(nextBlock)
                nextBlock = Math.floor(Math.random() * 6);
                setNextImg(nextBlock)
                if (isSettle(blocks_arr[0])) {
                    c = 1000;
                }

                rewardChecking();
                if (point >= 1000) {
                    c = 1000;
                    won = true;
                }
            }

            c++;
            if (c < 1000) {
                level1(b, c);
            } else {
                if (won) {
                    $("#win_dialog").css("display", "block");
                    $("#playground").remove();
                    won=false;
                } else {
                    $("#dialog").css("display", "block");
                    $("#playground").remove();
                }
            }
        }, 1000)

    }

    //level3
    function level3(b, c) {

        b = blocks_arr[0];
        $(".counting").css("display", "block");
        timeout = setTimeout(function () {

            if (!isSettle(b)) {
                drop(blocks_arr)
            } else {

                for (let i = 0; i < blocks_arr[0].length; i++) {
                    let block1 = blocks_arr[0][i][0] + "-" + blocks_arr[0][i][1];
                    $("#" + block1 + "").text("1");
                }
                makeBlock(nextBlock)
                nextBlock = Math.floor(Math.random() * 6);
                setNextImg(nextBlock)
                if (isSettle(blocks_arr[0])) {
                    c = 1000;
                }

                rewardChecking();
                if (point >= 1000) {
                    c = 1000;
                    won = true;
                }
            }

            c++;
            if (c < 1000) {
                level3(b, c);
                if (seconds == 5) {
                    concreteLine(blocks_arr);
                    seconds = 0;

                }
            } else {
                if (won) {
                    $("#win_dialog").css("display", "block");
                    $("#playground").remove();
                    won=false;
                } else {
                    $("#dialog").css("display", "block");
                    $("#playground").remove();
                }
            }
        }, 500)

    }
    //level2
    function level2(b, c) {
        b = blocks_arr[0];

        $(".counting").css("display", "block");
        timeout = setTimeout(function () {
            if (!isSettle(b)) {
                drop(blocks_arr)
            } else {

                for (let i = 0; i < blocks_arr[0].length; i++) {
                    let block1 = blocks_arr[0][i][0] + "-" + blocks_arr[0][i][1];
                    $("#" + block1 + "").text("1");
                }
                makeBlock(nextBlock)
                nextBlock = Math.floor(Math.random() * 6);
                setNextImg(nextBlock)
                if (isSettle(blocks_arr[0])) {
                    c = 1000;
                }

                rewardChecking();
                if (point >= 1000) {
                    c = 1000;
                    won = true;
                }
            }

            c++;
            if (c < 1000) {
                level2(b, c);
                if (seconds == 25) {
                    seconds = 20;
                    boombing();
                }
            } else {
                if (won) {
                    $("#win_dialog").css("display", "block");
                    $("#playground").remove();
                    won=false;
                } else {
                    $("#dialog").css("display", "block");
                    $("#playground").remove();
                }
            }
        }, 500)

    }
    //level6
    function level6(b, b2, c) {
        max_row = 25
        b = blocks_arr[0];
        b2 = blocks_arr2[0];
        timeout = setTimeout(function () {
            if (!isSettle(b)) {
                drop(blocks_arr)
            } else {
                for (let i = 0; i < blocks_arr[0].length; i++) {
                    let block1 = blocks_arr[0][i][0] + "-" + blocks_arr[0][i][1];
                    $("#" + block1 + "").text("1");
                }
                makeBlock(nextBlock)
                nextBlock = Math.floor(Math.random() * 6);
                setNextImg(nextBlock)
                if (isSettle(blocks_arr[0])) {
                    c = 1000;
                }

                rewardChecking();
                if (point >= 1000) {
                    c = 1000;
                    won = true;
                }
            }
            if (!isSettle2(b2)) {
                moveUp(blocks_arr2)
            } else {

                for (let i = 0; i < blocks_arr2[0].length; i++) {
                    let block1 = blocks_arr2[0][i][0] + "-" + blocks_arr2[0][i][1];
                    $("#" + block1 + "").text("1");
                }
                makeBlock2(nextBlock2)
                nextBlock2 = Math.floor(Math.random() * 6);

                setNextImg2(nextBlock2)
                if (isSettle2(blocks_arr2[0])) {
                    c = 1000;
                }

                rewardChecking_level6();
                if (point >= 1000) {
                    c = 1000;
                    won = true;
                }
            }

            c++;
            if (c < 1000) {
                level6(b, b2, c);
            } else {
                max_row = 20
                if (won) {
                    $("#win_dialog").css("display", "block");
                    $("#playground").remove();
                    won=false;
                } else {
                    $("#dialog").css("display", "block");
                    $("#playground").remove();
                    $(".banner-bottom").remove();

                }
            }
        }, 1000)

    }
    //level5
    function level5(b, c) {
        b = blocks_arr[0];

        timeout = setTimeout(function () {
            if (!isSettle(b)) {
                drop(blocks_arr)
            } else {

                for (let i = 0; i < blocks_arr[0].length; i++) {
                    let block1 = blocks_arr[0][i][0] + "-" + blocks_arr[0][i][1];
                    $("#" + block1 + "").text("1");
                }
                makeBlock(nextBlock)
                nextBlock = Math.floor(Math.random() * 6);
                setNextImg(nextBlock)
                if (isSettle(blocks_arr[0])) {
                    c = 1000;
                }

                rewardChecking_level5();
                if (point >= 1000) {
                    c = 1000;
                    won = true;
                }
            }

            c++;
            if (c < 1000) {
                level5(b, c);
            } else {
                if (won) {
                    $("#win_dialog").css("display", "block");
                    $("#playground").remove();
                    won=false;
                } else {
                    $("#dialog").css("display", "block");
                    $("#playground").remove();
                }
            }
        }, 500)

    }
    //level4
    function level4(b, c) {
        b = blocks_arr[0];
        $(".counting").css("display", "block");
        timeout = setTimeout(function () {
            if (!isSettle(b)) {
                var chance = Math.floor(Math.random() * 10);
                if (isBarrier == true && seconds == timeBarrier + 3) {
                    deleteBarrier()
                }
                // if (isBarrier == true && barrier[0][0] + 1 < b[4][0][0])
                //     deleteBarrier()
                drop(blocks_arr)
                if (chance < 4 && isBarrier == false) {
                    makeBarrier();
                }

            } else {
                deleteBarrier()
                for (let i = 0; i < blocks_arr[0].length; i++) {
                    let block1 = blocks_arr[0][i][0] + "-" + blocks_arr[0][i][1];
                    $("#" + block1 + "").text("1");
                }
                makeBlock(nextBlock)
                nextBlock = Math.floor(Math.random() * 6);
                setNextImg(nextBlock)
                if (isSettle(blocks_arr[0])) {
                    c = 1000;
                }

                rewardChecking();
                if (point >= 1000) {
                    c = 1000;
                    won = true;
                }
            }

            c++;
            if (c < 1000) {
                level4(b, c);
            } else {
                if (won) {
                    $("#win_dialog").css("display", "block");
                    $("#playground").remove();
                    won=false;
                } else {
                    $("#dialog").css("display", "block");
                    $("#playground").remove();
                }
            }
        }, 500)

    }

    function play(level, b) {
        c = 0;
        seconds = 0;
        switch (level) {
            case 'level1':
                level1(b[0], c)
                break;
            case 'level2':

                level2(b[0], c)
                break;
            case 'level3':
                level3(b[0], c);
                break;
            case 'level4':
                level4(b[0], c);
                break;
            case 'level5':
                level5(b[0], c);
                break;
            case 'level6':
                level6(b[0], b[1], c);

                break;
        }
    }
})
;