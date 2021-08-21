import React, {useState} from 'react'
import {StyleSheet, SafeAreaView, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useKeyboardListener} from '@hooks/index'
import {IProps} from '@app/types'
import {IAccountForm} from '@app/domain/models/modules/account'

import myStyles from '@styles/index'
import {RAW_COLORS, SPACES} from '@styles/vars'

import AddAcountImage from '@assets/illustrations/add-account.svg'
import {KeyboardAwareWrapper} from '@components/wrapper'
import Header from '@components/Header'
import Text from '@components/Text'
import {FormikForm, FormikInput} from '@components/formik'

interface IPAccountForm extends IProps {}

const AccountForm: React.FunctionComponent<IPAccountForm> = props => {
  const navigation = useNavigation()
  const keyboardVisibility = useKeyboardListener()

  const [initialValues, setInitialValues] = useState<IAccountForm>({
    name: '',
    amount: '',
    accountType: '',
  })

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title="Create Account" />
      <KeyboardAwareWrapper>
        <View style={styles.contentContainer}>
          {keyboardVisibility ? (
            <AddAcountImage style={{alignSelf: 'flex-start', marginTop: -SPACES.twoSpace}} height={120} width={120} />
          ) : (
            <AddAcountImage style={styles.illustrationImg} height={210} width={210} />
          )}
          <Text style={styles.title}>Add new account</Text>
          <FormikForm
            initialValues={initialValues}
            onSubmit={async ({resetForm, setSubmitting}: any) => {
              console.log('masuk')
              setSubmitting(true)
              resetForm()
            }}>
            <FormikInput label="Account name" name="name" placeholder="Main savings" />
            <FormikInput
              label="Starter amount"
              name="amount"
              placeholder="Rp100.000"
              isNumber={true}
              autoCapitalize="none"
            />
            <FormikInput
              label="Account type"
              name="accountType"
              placeholder="Bank"
              autoCapitalize="none"
              withSubmitButton={true}
            />
          </FormikForm>
        </View>
      </KeyboardAwareWrapper>
    </SafeAreaView>
  )
}

export default AccountForm

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: RAW_COLORS.background,
    flex: 1,
  },
  contentContainer: {
    ...myStyles.phOne,
    paddingTop: 64,
  },
  illustrationImg: {
    alignSelf: 'center',
    marginLeft: SPACES.oneSpace + SPACES.halfSpace,
    marginTop: -SPACES.twoSpace,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Prompt_700Bold',
    marginVertical: SPACES.twoSpace,
  },
})
