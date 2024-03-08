import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { verifyEmail } from 'src/libs/modules/hrm/employees'
import { DataContext } from 'src/context/DataContext'

const VerifyEmail = () => {
  const router = useRouter()
  const query = router.query
  const token = query.token
  const { data, setSharedData } = useContext(DataContext)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const verify = async token => {
    try {
      await verifyEmail(token)

      setSharedData({ notification: 'show', color: 'green', title: 'Email was verified!', message: 'Login now!' })
    } catch (error) {
      setSharedData({
        notification: 'show',
        color: 'error',
        title: "Email can't verified!",
        message: 'Please resend verification email!'
      })
    }
    router.replace('/login')
  }

  useEffect(() => {
    verify(token)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return
}

VerifyEmail.getLayout = page => <BlankLayout>{page}</BlankLayout>
VerifyEmail.guestGuard = true

export default VerifyEmail
