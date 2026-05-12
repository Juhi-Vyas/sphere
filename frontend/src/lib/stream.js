import { StreamVideoClient } from "@stream-io/video-react-sdk";

let streamClient = null;

export const initializeStreamClient = async (
  user,
  token
) => {

  if (streamClient) {
    return streamClient;
  }

  const apiKey =
    import.meta.env.VITE_STREAM_API_KEY;

  streamClient =
    new StreamVideoClient({
      apiKey,
      user,
      token,
    });

  return streamClient;

};

export const disconnectStreamClient =
  async () => {

    if (streamClient) {

      await streamClient.disconnectUser();

      streamClient = null;

    }

};