export default {
  meEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/profile`,
  loginEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
  registerEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
  userPermissions: `${process.env.NEXT_PUBLIC_API_URL}/authorization/permissions/user`,
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
