const { MetricsApi, EventsApi } = require('klaviyo-api');

require('dotenv').config();
require('klaviyo-api').EventsApi;


module.exports = async (payload, helpers) => {
  // Crear perfil en Klaviyo
  const optionsProfile = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      revision: '2024-07-15',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      data: {
        type: 'profile',
        attributes: {
          email: payload.email,
          first_name: payload.firstName,
          last_name: payload.lastName
        }
      }
    })
  };

  console.log('------------------------------- Profile -----------------------------------')
  await fetch('https://a.klaviyo.com/client/profiles/?company_id='+ process.env.KLAVIYO_PUBLIC_KEY, optionsProfile)
  .then(response => console.log(response))
  .catch(err => console.error('Error: ',err.status));
  console.log('--------------------------------------------------------------------------')

  const optionsEvent = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      revision: '2024-07-15',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      data: {
        type: 'event',
        attributes: {
          properties: {
            first_name: payload.firstName,
            url_activate: `${process.env.DOMINIO}/usuario/Activate?ActivateAccountToken=${payload.token_activate}&cedula=${payload.cedula}`
          },
          metric: {data: {type: 'metric', attributes: {name: 'Enviar correo'}}},
          profile: {
            data: {
              type: 'profile',
              attributes: {
                email: payload.email,
                first_name: payload.firstName,
                last_name: payload.lastName
              }
            }
          },
          unique_id: payload.token_activate
        }
      }
    })
  };
  

  console.log('------------------------------- Profile -----------------------------------')
  await fetch('https://a.klaviyo.com/client/events/?company_id='+ process.env.KLAVIYO_PUBLIC_KEY, optionsEvent)
  .then(response => console.log(response))
  .catch(err => console.error('Error: ',err.status));
  console.log('--------------------------------------------------------------------------')
};
