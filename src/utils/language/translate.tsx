import React from 'react'
import { useTranslation } from 'react-i18next'

export const Translate = props => {
  const { t, i18n } = useTranslation()

  return (
    <>
      <span dangerouslySetInnerHTML={{__html: t(`${props.contentKey}`) }}></span>
    </>
  )
}

