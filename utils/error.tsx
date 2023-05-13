import { toast } from 'react-toastify';

export default function showToastMessage(type: string, message: string) {
  if (type === 'success') {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  if (type === 'error') {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  if (type === 'warning') {
    toast.warn(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  if (type === 'info') {
    toast.info(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}
