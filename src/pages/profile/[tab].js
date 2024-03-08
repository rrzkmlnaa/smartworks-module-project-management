import AccountSettings from 'src/views/pages/profile/AccountSettings'

const AccountSettingsTab = ({ tab }) => {
  return <AccountSettings tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'general' } },
      { params: { tab: 'education' } },
      { params: { tab: 'career' } },
      { params: { tab: 'insurance' } },
      { params: { tab: 'security' } }
    ],
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      tab: params?.tab
    }
  }
}

AccountSettingsTab.acl = {
  action: 'read',
  subject: 'own_profile'
}

export default AccountSettingsTab
