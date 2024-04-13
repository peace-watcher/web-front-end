import axios from 'axios';

const client = axios.create({
  baseURL: 'http://3.34.74.202',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': 'http://3.34.74.202',
  },
});

export const postPushNotificationTrigger = async () => {
  try {
    const response = await client.post(`/send`);
    console.log(response);
    return location;
  } catch (error) {
    console.error(error);
  }
};
