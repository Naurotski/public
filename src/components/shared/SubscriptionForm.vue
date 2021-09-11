<template>
  <div class="sp-form-outer sp-fixed-outer sp-force-hide">
    <div
      id="sp-form-144819"
      sp-id="144819"
      sp-hash="0caad5015407653690101053ed68576a0f6d828dde17b4dd149d1d205caefa32"
      sp-lang="ru"
      class="sp-form sp-form-regular sp-form-fixed sp-form-fixed__bottom-right"
      sp-show-options="%7B%22satellite%22%3Afalse%2C%22maDomain%22%3A%22login.sendpulse.com%22%2C%22formsDomain%22%3A%22forms.sendpulse.com%22%2C%22condition%22%3A%22onEnter%22%2C%22scrollTo%22%3A25%2C%22delay%22%3A10%2C%22repeat%22%3A3%2C%22background%22%3A%22rgba(0%2C%200%2C%200%2C%200.5)%22%2C%22position%22%3A%22bottom-right%22%2C%22animation%22%3A%22%22%2C%22hideOnMobile%22%3Afalse%2C%22urlFilter%22%3Afalse%2C%22urlFilterConditions%22%3A%5B%7B%22force%22%3A%22show%22%2C%22clause%22%3A%22equal%22%2C%22token%22%3A%22https%3A%2F%2Fmetamorfosi.eu%22%7D%2C%7B%22force%22%3A%22show%22%2C%22clause%22%3A%22contains%22%2C%22token%22%3A%22userProfile%22%7D%5D%2C%22analytics%22%3A%7B%22ga%22%3A%7B%22eventLabel%22%3A%22%D0%9F%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%BA%D0%B0_%D1%81_%D1%81%D0%B0%D0%B9%D1%82%D0%B0%22%2C%22send%22%3Afalse%7D%2C%22ym%22%3A%7B%22counterId%22%3Anull%2C%22eventLabel%22%3Anull%2C%22targetId%22%3Anull%2C%22send%22%3Afalse%7D%7D%7D"
    >
      <div class="sp-form-fields-wrapper">
        <button class="sp-btn-close ">&nbsp;</button>
        <div class="sp-message"><div></div></div>
        <form novalidate="" class="sp-element-container ui-sortable ui-droppable sp-field-nolabel ">
          <div class="sp-field " sp-id="sp-b35b862e-6a2e-453e-8440-ce8fb218d27b">
            <div style="font-family: inherit; line-height: 1.2;">
              <p style="text-align: center;">
                <span style="color: #808080;">Подписка на рассылку</span>
              </p>
            </div>
          </div>
          <div class="sp-field " sp-id="sp-17ea4174-ad29-4f3f-81b2-382ad33c84be">
            <div class="sp-checkbox-option">
              <label
                ><input
                  type="checkbox"
                  sp-type="gdprConfirm"
                  name="sform[Z2RwckNvbmZpcm0=]"
                  value="yes"
                  sp-tips="%7B%22required%22%3A%22%D0%9E%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%BF%D0%BE%D0%BB%D0%B5%22%7D"
                  class=" "
                  required="required"
                /><span>Да, пожалуйста уведомляйте меня о новостях, событиях и предложениях</span
                >&nbsp;<span><strong>*</strong></span></label
              >
            </div>
          </div>
          <div class="sp-field " sp-id="sp-30ee92c2-ce97-480a-a169-17afcb279d13">
            <div class="sp-checkbox-option">
              <label
                ><input
                  type="checkbox"
                  sp-type="gdprTerms"
                  name="sform[Z2RwclRlcm1z]"
                  value="yes"
                  sp-tips="%7B%22required%22%3A%22%D0%9E%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%BF%D0%BE%D0%BB%D0%B5%22%7D"
                  class=" "
                  required="required"
                /><span
                  >Подписываясь на рассылку, вы соглашаетесь с
                  <dialog-privacy-policy
                    ><span class="overline" style="color: white"
                      >политикой конфиденциальности</span
                    ></dialog-privacy-policy
                  >
                  и даете согласие на использование файлов cookie и передачу своих персональных
                  данных</span
                >&nbsp;<span><strong>*</strong></span></label
              >
            </div>
          </div>
          <div class="sp-field " sp-id="sp-3b4cd5d6-bd86-4b64-a284-f950ee20fda4">
            <label class="sp-control-label"><span>Email</span><strong>*</strong></label
            ><input
              :value="userEmail"
              type="email"
              sp-type="email"
              name="sform[email]"
              class="sp-form-control"
              placeholder="username@gmail.com"
              sp-tips="%7B%22required%22%3A%22%D0%9E%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%BF%D0%BE%D0%BB%D0%B5%22%2C%22wrong%22%3A%22%D0%9D%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D1%8B%D0%B9%20email-%D0%B0%D0%B4%D1%80%D0%B5%D1%81%22%7D"
              required="required"
            />
          </div>
          <div
            class="sp-field sp-button-container "
            sp-id="sp-66482a80-4927-47e2-98d1-5597e3b450d9"
          >
            <button id="sp-66482a80-4927-47e2-98d1-5597e3b450d9" class="sp-button">
              Подписаться
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionForm',
  components: {
    DialogPrivacyPolicy: () => import('./DialogPrivacyPolicy')
  },
  computed: {
    userEmail() {
      return this.$store.getters.user.email || ''
    }
  }
}
</script>

<style scoped lang="stylus">
.sp-force-hide { display: none;}.sp-form[sp-id="144819"] { display: block; background: #ffa726; padding: 15px; width: 320px; max-width: 100%; border-radius: 8px; -moz-border-radius: 8px; -webkit-border-radius: 8px; border-color: #dddddd; border-style: solid; border-width: 1px; font-family: inherit; background-repeat: no-repeat; background-position: center; background-size: auto;}.sp-form[sp-id="144819"] input[type="checkbox"] { display: inline-block; opacity: 1; visibility: visible;}.sp-form[sp-id="144819"] .sp-form-fields-wrapper { margin: 0 auto; width: 290px;}.sp-form[sp-id="144819"] .sp-form-control { background: #eeeeee; border-color: #e6e6e6; border-style: solid; border-width: 2px; font-size: 15px; padding-left: 8.75px; padding-right: 8.75px; border-radius: 4px; -moz-border-radius: 4px; -webkit-border-radius: 4px; height: 35px; width: 100%;}.sp-form[sp-id="144819"] .sp-field label { color: #444444; font-size: 13px; font-style: normal; font-weight: bold;}.sp-form[sp-id="144819"] .sp-button { border-radius: 4px; -moz-border-radius: 4px; -webkit-border-radius: 4px; background-color: #bbdefb; color: #ffffff; width: auto; font-weight: 700; font-style: normal; font-family: "Open Sans", Arial, "Helvetica Neue", sans-serif; box-shadow: none; -moz-box-shadow: none; -webkit-box-shadow: none; background: linear-gradient(to top, #81c2f8 , #f5fafe);}.sp-form[sp-id="144819"] .sp-button-container { text-align: center;}
</style>
