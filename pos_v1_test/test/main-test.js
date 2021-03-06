'use strict';

describe('pos', () => {
    //测试格式化输入
  it('formatted tags function calculateCount,should print countArray[]',() => {
      let tags = [
          'ITEM000001',
          'ITEM000001',
          'ITEM000001',
          'ITEM000001',
          'ITEM000001',
          'ITEM000003-2',
          'ITEM000003-2.5',
          'ITEM000005',
          'ITEM000005-2',
      ];
      let result=[];
      result =[ { barcode: 'ITEM000001', count: 5 },
          { barcode: 'ITEM000003', count: 2 },
          { barcode: 'ITEM000003', count: 2.5 },
          { barcode: 'ITEM000005', count: 1 },
          { barcode: 'ITEM000005', count: 2 } ];
      expect(calculateCount(tags)).toEqual(result);
  });
  //测试找出barcode
  it('find out countArray that has how many barcode,should print getBarcodeArray[]',() => {
      let countArray=[{ barcode: 'ITEM000003', count: 2.5 },
          { barcode: 'ITEM000005', count: 1 },
          { barcode: 'ITEM000005', count: 2 } ];
      let result=[];
      result=[ 'ITEM000003', 'ITEM000005' ];
      expect(getBarcodeArray(countArray)).toEqual(result);
  });
  //测试去掉重复的barcode,输出完整的{barcode: ,count:}
  it('Remove Duplicate Barcode，should print distincy',() => {
      let getBarcodeArray=[ 'ITEM000001', 'ITEM000003', 'ITEM000005' ];
      let countArray=[ { barcode: 'ITEM000001', count: 5 },
          { barcode: 'ITEM000003', count: 2.5 },
          { barcode: 'ITEM000005', count: 1 },
          { barcode: 'ITEM000005', count: 1 },
          { barcode: 'ITEM000005', count: 2 } ];
      let result=[];
      result=[ { barcode: 'ITEM000001', count: 5 },
          { barcode: 'ITEM000003', count: 2.5 },
          { barcode: 'ITEM000005', count: 4 } ];
      expect(distincyReceipt(getBarcodeArray,countArray)).toEqual(result);
  });
  //测试生成完整的没有打折的receipt
  it('Generate complete receipt with no discounts,should print receiptCountSum',() => {
      let distincy=[{ barcode: 'ITEM000003', count: 2.5 },
          { barcode: 'ITEM000005', count: 3 } ];
      let result =[];
      result=[{ barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15,
              count: 2.5,
              sum: 37.5 },
          { barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.5,
              count: 3,
              sum: 13.5 } ];
      expect(makeReceipt(distincy)).toEqual(result);
  });
  //测试生成打折后的receipt
  it('Generate Discounted Receipt,should print receiptSave',() => {
      let receiptCountSum=[ { barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3,
          count: 6,
          sum: 18 },
          { barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15,
              count: 2.5,
              sum: 37.5 },
          { barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.5,
              count: 3,
              sum: 13.5 } ];
      let result=[];
      result=[ { barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3,
          count: 6,
          sum: 12 },
          { barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15,
              count: 2.5,
              sum: 37.5 },
          { barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.5,
              count: 3,
              sum: 9 } ];
      expect(makeReceiptSum(receiptCountSum)).toEqual(result);
  });
  it('Format output，should print String',() => {
      let receiptSum =[ { barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3,
          count: 5,
          sum: 12 },
          { barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.5,
              count: 3,
              sum: 9 } ];
      let result=`***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：21.00(元)
节省：7.50(元)
**********************`
      expect(buildPrintReceipt(receiptSum)).toBe(result);
  });

  it('should print text', () => {

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

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
