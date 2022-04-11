import {useEffect, useState, useContext} from 'react';
import {baseUrl, appID} from '../utils/variables';
import {MediaContext} from '../contexts/MediaContext';

const fetchJson = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.message;
      throw new Error(message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const useMedia = (showAllFiles, userId) => {
  const {update} = useContext(MediaContext);
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const getMedia = async () => {
    try {
      setLoading(true);
      let media = await useTag().getTag(appID);
      // jos !showAllFiles, filteröi kirjautuneen käyttäjän tiedostot mediataulukkoon
      if (!showAllFiles) {
        media = media.filter((file) => file.user_id === userId);
      }
      const allFiles = await Promise.all(
        media.map(async (file) => {
          return await fetchJson(`${baseUrl}media/${file.file_id}`);
        })
      );

      setMediaArray(allFiles);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMedia();
  }, [userId, update]);

  const postMedia = async (formdata, token) => {
    try {
      setLoading(true);
      const fetchOptions = {
        method: 'POST',
        headers: {
          'x-access-token': token,
        },
        body: formdata,
      };
      return await fetchJson(baseUrl + 'media', fetchOptions);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (fileId, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchJson(baseUrl + 'media/' + fileId, fetchOptions);
  };

  return {mediaArray, postMedia, deleteMedia, loading};
};

const useUser = () => {
  const getUser = async (token) => {
    const fetchOptions = {
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchJson(baseUrl + 'users/user', fetchOptions);
  };

  const getUsername = async (username) => {
    const checkUser = await fetchJson(baseUrl + 'users/username/' + username);
    return checkUser.available;
  };

  const getUserById = async (userId, token) => {
    const fetchOptions = {
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchJson(baseUrl + 'users/' + userId, fetchOptions);
  };

  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchJson(baseUrl + 'users', fetchOptions);
  };

  return {getUser, postUser, getUsername, getUserById};
};

const useLogin = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchJson(baseUrl + 'login', fetchOptions);
  };
  return {postLogin};
};

const useTag = () => {
  const getTag = async (tag) => {
    const tagResult = await fetchJson(baseUrl + 'tags/' + tag);
    if (tagResult.length > 0) {
      return tagResult;
    } else {
      throw new Error('No results');
    }
  };

  const postTag = async (data, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await fetchJson(baseUrl + 'tags/', fetchOptions);
  };

  return {getTag, postTag};
};

export {useMedia, useLogin, useUser, useTag};
