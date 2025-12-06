import api from '../api/axiosInstance';

export interface Status {
  status: string;
}

const getFriendStatus = async (userId: number) => {
  try {
    const meId = Number(localStorage.getItem('id'));
    const status: Status = await (
      await api.get(`friend/status/${meId}/${userId}`)
    ).data;

    return status.status;
  } catch (e) {
    console.error(e);
    return 'unknown';
  }
};

export default getFriendStatus;
