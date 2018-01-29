const Serverless = require('framework')
const { AWS } = Serverless

const IAM = new AWS.IAM({region: 'us-east-1'})

module.exports = async (lambdaName) => {
  await IAM.detachRolePolicy({
    RoleName: `lambda-${lambdaName}`,
    PolicyArn: 'arn:aws:iam::aws:policy/AdministratorAccess'
  }).promise()

  await IAM.deleteRole({
    RoleName: `lambda-${lambdaName}`
  }).promise()
}