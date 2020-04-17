var namedHeadings = require('./index')
var test = require('ava')

var md = require('markdown-it')()
  .use(namedHeadings, {})

var md2 = require('markdown-it')()
  .use(namedHeadings, {
    unidecode: false
  })

test('add ids', t => {
  var out = md.render('# hello')
  t.true(out === '<h1 id="hello">hello</h1>\n')
})

test('unicode cyrillic', t => {
  var out = md.render('# заголовок')
  t.true(out === '<h1 id="zagholovok">заголовок</h1>\n')
})

test('unicode japanese', t => {
  var out = md.render('# タイトル')
  t.true(out === '<h1 id="taitoru">タイトル</h1>\n')
})

test('unicode japanese 2', t => {
  var out = md.render('# 再度確認し')
  t.true(out === '<h1 id="zai-du-que-ren-si">再度確認し</h1>\n')
})

test('unicode korean', t => {
  var out = md.render('# 제목')
  t.true(out === '<h1 id="jemog">제목</h1>\n')
})

test('unicode korean without unidecode', t => {
  var out = md2.render('# 제목 확인')
  t.true(out === '<h1 id="제목-확인">제목 확인</h1>\n')
})

test('kebabcase ids', t => {
  var out = md.render('# hello there')
  t.true(out === '<h1 id="hello-there">hello there</h1>\n')
})

test('handle collisions', t => {
  var out = md.render('# hello there\n# hello there\n# hello there')
  t.true(out ===
    '<h1 id="hello-there">hello there</h1>\n' +
    '<h1 id="hello-there-1">hello there</h1>\n' +
    '<h1 id="hello-there-2">hello there</h1>\n')
})
