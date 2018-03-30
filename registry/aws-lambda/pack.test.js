const path = require('path')
const os = require('os')
const crypto = require('crypto')
const fse = require('fs-extra')
const BbPromise = require('bluebird')
const admZip = require('adm-zip')
const pack = require('./pack')

const fsp = BbPromise.promisifyAll(fse)

describe('#pack()', () => {
  let tempPath
  const packagePath = __dirname

  beforeEach(async () => {
    tempPath = path.join(
      os.tmpdir(),
      crypto.randomBytes(6).toString('hex')
    )
    await fsp.ensureDirAsync(tempPath)
  })

  it('should zip the aws-lambda component and return the zip file content', async () => {
    const zipRes = await pack(packagePath, tempPath)
    const zip = admZip(zipRes)
    const files = zip.getEntries().map((entry) => ({
      name: entry.entryName,
      content: entry.getData()
    }))
    const zipFile = files.filter((file) => file.name.match(/.+.zip/)).pop()

    expect(files.length)
    expect(zipFile).not.toBeFalsy()
  })
})
