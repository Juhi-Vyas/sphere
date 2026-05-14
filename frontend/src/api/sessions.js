import axiosInstance from "../lib/axios";

export const sessionApi = {

  // CREATE SESSION
  createSession: async (
    data,
    token
  ) => {

    const res =
      await axiosInstance.post(
        "/sessions",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;

  },

  // GET ACTIVE SESSIONS
  getActiveSessions: async (
    token
  ) => {

    const res =
      await axiosInstance.get(
        "/sessions/active",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;

  },

  // GET RECENT SESSIONS
  getMyRecentSessions: async (
    token
  ) => {

    const res =
      await axiosInstance.get(
        "/sessions/my-recent",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;

  },

  // GET SESSION BY ID
  getSessionById: async (
    id,
    token
  ) => {

    const res =
      await axiosInstance.get(
        `/sessions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;

  },

  // JOIN SESSION
  joinSession: async (
    id,
    token
  ) => {

    const res =
      await axiosInstance.post(
        `/sessions/${id}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;

  },

  // END SESSION
  endSession: async (
    id,
    token
  ) => {

    const res =
      await axiosInstance.post(
        `/sessions/${id}/end`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;

  },

  // STREAM TOKEN
  getStreamToken: async (
    token
  ) => {

    const res =
      await axiosInstance.get(
        "/chat/token",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return res.data;

  },

};