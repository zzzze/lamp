import anyTest, {TestInterface} from 'ava'
import {stub, SinonStub} from 'sinon'
import {
  urlSlash,
  makePath,
} from '../../src/utils/path'

interface IContext {
  platformStub: SinonStub
}

const test = anyTest as TestInterface<IContext>

test.before(t => {
  t.context.platformStub = stub(process, 'platform').value('win32')
})

test.after(t => {
  t.context.platformStub.restore()
})

test('#urlSlash - should be invoked successfully', async t => {
  t.is(urlSlash(), '\\')
})

test('#makePath', t => {
  let pathname = '/abc/def/ghi'
  t.is(makePath(pathname), '\\\\abc\\\\def\\\\ghi')
  pathname = '\\\\abc/def/ghi'
  t.is(makePath(pathname), '\\\\abc\\\\def\\\\ghi')
  pathname = '/abc\\\\def/ghi'
  t.is(makePath(pathname), '\\\\abc\\\\def\\\\ghi')
  pathname = '/abc/def\\\\ghi'
  t.is(makePath(pathname), '\\\\abc\\\\def\\\\ghi')
  pathname = '\\\\abc\\\\def\\\\ghi'
  t.is(makePath(pathname), '\\\\abc\\\\def\\\\ghi')
})
