const { ac, l } = require('./index.js');

// test('ac.replace', () => {
//   ac.replace('test');
//   expect(ac.replace).toBeCalled();
// });

// test('ac.write', () => {
//   ac.write('test');
//   expect(ac.write).toBeCalled();
// });

test('ac.log', () => {
  try {
    ac.log('line', 'test');
    expect(true).toBe(true);
  } catch (error) {
    expect(false).toBe(true);
  }
});

test('l.og', () => {
  try {
    l.og();
    expect(true).toBe(true);
  } catch (error) {
    expect(false).toBe(true);
  }
});

test('l.og with item', () => {
  try {
    l.og({data:'foo'});
    expect(true).toBe(true);
  } catch (error) {
    expect(false).toBe(true);
  }
});

// test('l.og pin', () => {
//   l.og();
//   expect(l.og).toBeCalled();
// });

// test('l.og', () => {
//   l.og('test');
//   expect(l.og).toBeCalled();
// });

// test('l.og_error', () => {
//   l.og_error('test');
//   expect(l.og_error).toBeCalled();
// });

// test('l.og_trace', () => {
//   l.og_trace('test');
//   expect(l.og_trace).toBeCalled();
// });

// test('l.og_dispatch', () => {
//   l.og_dispatch('test');
//   expect(l.og_dispatch).toBeCalled();
// });