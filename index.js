const fs = require('fs')
const process = require('process')

const [,, inputFile, outputFile, overwriteFile] = process.argv

if (inputFile === undefined && overwriteFile === undefined) {
  process.stdin.on('data', (data) => {
    let fullString = ''
    const dataNew = data.toString().split('\n')
    for (let i = 0; i < dataNew.length; i += 1) {
      fullString += `${i + 1}: ${dataNew[i]}\n`
    }
    console.log(fullString)
  })
} else if (outputFile !== undefined) {
  const arrayFile = fs.readFileSync(inputFile).toString().split('\n')
  let fullString = ''
  for (let i = 0; i < arrayFile.length; i += 1) {
    fullString += `${i + 1}: ${arrayFile[i]}\n`
  }
  if (fs.existsSync(outputFile)) {
    if (overwriteFile === '-y') {
      fs.writeFile(outputFile, fullString, (err) => {
        if (err) {
          throw err
        }
      })
    } else {
      console.log('Dont overwrite the file!')
      process.exit(1)
    }
    console.log('The file exists:', outputFile)
  } else {
    fs.writeFile(outputFile, fullString, (err) => {
      if (err) {
        throw err
      }
      console.log('File is created successfully.')
      process.exit(1)
    })
  }
} else {
  console.log('The "path" argument must be of type string or an instance of Buffer or URL.')
}
