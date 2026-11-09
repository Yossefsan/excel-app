import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CATEGORIES,
  EXCEL_FUNCTIONS,
  searchFunctions,
  evaluateFormulaDemo,
  QUIZ_QUESTIONS,
} from './excel_logic';

test('inventory verification: exactly 11 functions and 4 categories', () => {
  assert.equal(Object.keys(CATEGORIES).length, 4);
  assert.equal(Object.keys(EXCEL_FUNCTIONS).length, 12);
  
  // Verify MAX is in MATH category
  assert.equal(EXCEL_FUNCTIONS.MAX.category, 'MATH');
  assert.ok(CATEGORIES.MATH.functions.includes('MAX'));
  assert.ok(!CATEGORIES.LOOKUP.functions.includes('MAX'));
  
  // Category counts: 4 + 3 + 2 + 3 = 12
  assert.equal(CATEGORIES.MATH.functions.length, 4);   // SUM, COUNT, AVERAGE, MAX
  assert.equal(CATEGORIES.LOGIC.functions.length, 3);  // IF, IFS, AND
  assert.equal(CATEGORIES.LOOKUP.functions.length, 2); // MATCH, VLOOKUP
  assert.equal(CATEGORIES.TEXT.functions.length, 3);   // CONCAT, TRIM, LOWER
});

test('searchFunctions returns matching results by English name or Arabic description', () => {
  const sumResult = searchFunctions('SUM');
  assert.equal(sumResult.length, 1);
  assert.equal(sumResult[0].name, 'SUM');

  const vlookupResult = searchFunctions('vlookup');
  assert.equal(vlookupResult.length, 1);
  assert.equal(vlookupResult[0].name, 'VLOOKUP');

  const arabicSearch = searchFunctions('الجمع');
  assert.ok(arabicSearch.some(fn => fn.name === 'SUM'));

  const emptySearch = searchFunctions('');
  assert.equal(emptySearch.length, 12);
});

test('evaluateFormulaDemo correctly evaluates standard sample operations', () => {
  assert.equal(evaluateFormulaDemo('SUM', '10, 20, 30, 40'), '100');
  assert.equal(evaluateFormulaDemo('AVERAGE', '10, 20, 30'), '20');
  assert.equal(evaluateFormulaDemo('MAX', '14, 99, 45, 82'), '99');
  assert.equal(evaluateFormulaDemo('COUNT', '1, 2, "hello", 4'), '3');
  assert.equal(evaluateFormulaDemo('CONCAT', 'Microsoft, Excel'), 'Microsoft Excel');
  assert.equal(evaluateFormulaDemo('TRIM', '   نص   منظف   '), 'نص منظف');
  assert.equal(evaluateFormulaDemo('LOWER', 'HELLO WORLD'), 'hello world');
  assert.equal(evaluateFormulaDemo('AND', '60, 80, 95'), 'TRUE');
  assert.equal(evaluateFormulaDemo('AND', '40, 80, 95'), 'FALSE');
  assert.equal(evaluateFormulaDemo('IF', '75'), 'ناجح');
  assert.equal(evaluateFormulaDemo('IF', '45'), 'راسب');
});

test('quiz questions integrity', () => {
  assert.ok(QUIZ_QUESTIONS.length >= 5);
  for (const q of QUIZ_QUESTIONS) {
    assert.ok(q.options.length >= 3);
    assert.ok(q.correctIndex >= 0 && q.correctIndex < q.options.length);
    assert.ok(q.question.length > 5);
  }
});
