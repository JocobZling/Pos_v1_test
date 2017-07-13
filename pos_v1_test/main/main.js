'use strict';
//格式化输入
function calculateCount(tags) {
    let countArray = [];
    let Count = {};
    for (let i = 0; i < tags.length;) {
        var count = 0;
        for (var j = i; j < tags.length; j++) {
            if (tags[i] == tags[j]) {
                var specialCount = tags[i].split("-");
                if (specialCount.length > 1) {
                    Count = {barcode: specialCount[0], count: parseFloat(specialCount[1])};
                }
                else {
                    Count = {barcode: tags[i], count: count + 1};
                }
                count++;
            }
        }
        countArray.push(Count);
        i += count;
    }
    console.log(countArray);
    return countArray;
}
//找出多少个BarcodeArray
function getBarcodeArray(countArray) {
    var getBarcodeArray = [];
    for (var i = 0, l = countArray.length; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
            if (countArray[i].barcode === countArray[j].barcode) {
                j = ++i;
            }
        }
        getBarcodeArray.push(countArray[i].barcode);
    }
    //console.log(getBarcodeArray);
    return getBarcodeArray;
}
//去掉重复的barcode,输出完整的{barcode: ,count:}
function distincyReceipt(getBarcodeArray, countArray) {
    let distincy = [];
    for (let i = 0; i < getBarcodeArray.length; i++) {
        let count = 0;
        for (let j = 0; j < countArray.length; j++) {
            if (getBarcodeArray[i] == countArray[j].barcode) {
                count += countArray[j].count;
            }
        }
        distincy[i] = {'barcode': getBarcodeArray[i], 'count': count};
        //count = 0;
        //console.log(count);
    }
    //console.log(distincy);
    return distincy;
}
//没有打折的完整Receipt
function makeReceipt(distincy) {
    var receipt = loadAllItems();
    var receiptCountSum = [];
    for (var i = 0; i < receipt.length; i++) {
        for (var j = 0; j < distincy.length; j++) {
            if (distincy[j].barcode == receipt[i].barcode) {
                receiptCountSum.push({
                    barcode: receipt[i].barcode,
                    name: receipt[i].name,
                    unit: receipt[i].unit,
                    price: receipt[i].price,
                    count: distincy[j].count,
                    sum: distincy[j].count * receipt[i].price
                })
            }
        }
    }
    //console.log(receiptCountSum);
    return receiptCountSum;
}
//生成打折后的receipt
function makeReceiptSum(receiptCountSum) {
    var loadPromotion = loadPromotions();
    var loadPromotionArray = [];
    loadPromotionArray = loadPromotion[0].barcodes;//缺少type的划分
    var receiptSave = [];
    receiptSave = receiptCountSum;
    for (var i = 0; i < receiptCountSum.length; i++) {
        for (var j = 0; j < loadPromotionArray.length; j++) {
            if (loadPromotionArray[j] == receiptCountSum[i].barcode) {
                receiptSave.splice(i, 1, {
                    barcode: receiptCountSum[i].barcode,
                    name: receiptCountSum[i].name,
                    unit: receiptCountSum[i].unit,
                    price: receiptCountSum[i].price,
                    count: receiptCountSum[i].count,
                    sum: receiptCountSum[i].sum - parseInt(receiptCountSum[i].count / 3) * receiptCountSum[i].price
                })
            }
        }
    }
    //console.log(receiptSave);
    return receiptSave;
}
//输出的方法
function buildPrintReceipt(receiptSave) {
    var s = "";
    var total = 0;
    var total1 = 0;//没有节省的钱
    var save = 0;
    for (let i = 0; i < receiptSave.length; i++) {
        s += "名称：" + receiptSave[i].name + "，数量：" + receiptSave[i].count + receiptSave[i].unit + "，单价：" + receiptSave[i].price.toFixed(2) + "(元)，小计：" + receiptSave[i].sum.toFixed(2) + "(元)\n";
        total += receiptSave[i].sum;
        total1 += receiptSave[i].count * receiptSave[i].price;
    }
    save = total1 - total;
    return `***<没钱赚商店>收据***
${s}----------------------
总计：${total.toFixed(2)}(元)
节省：${save.toFixed(2)}(元)
**********************`;
}
//各个function的调用
function printReceipt(tags) {
    var countArray = calculateCount(tags);
    var barcodeArray = getBarcodeArray(countArray);
    var distincy = distincyReceipt(barcodeArray, countArray);
    var receiptCountSum = makeReceipt(distincy);
    var receiptSave = makeReceiptSum(receiptCountSum);
    var printReceipt = buildPrintReceipt(receiptSave);
    console.log(printReceipt);
}
function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}

function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}
const tags = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2.5',
    'ITEM000005',
    'ITEM000005-2',
];
printReceipt(tags);
