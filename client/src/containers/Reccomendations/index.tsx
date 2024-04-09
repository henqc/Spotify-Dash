import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Track } from "../../utils/types";
import { API } from "../../api/index.ts";

const Reccomendations = () => {
  const { id } = useParams<{ id: string }>();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [tracks, setTracks] = useState<Track[]>(undefined as any as Track[]);

  const fetchData = useCallback(async () => {
    const isAuthenticated = await checkAuthenticationStatus();
    if (isAuthenticated) {
      const data = await API.getTracks(id);
      const trackDataPromises = data.items.map(async (item: any) => {
        const analysis = await API.getAudioAnalysis(item.track.id);
        return {
          id: item.track.id,
          external_urls: item.track.external_urls.spotify,
          name: item.track.name,
          analysis: analysis,
        };
      });
      const trackData = await Promise.all(trackDataPromises);
      setTracks(trackData);
      console.log(data);
      console.log(trackData);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, isLoggedIn]);

  const checkAuthenticationStatus = async () => {
    const data = await API.verify();
    if (data.logged_in) {
      setIsLoggedIn(true);
      return true;
    } else {
      setIsLoggedIn(false);
      return false;
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>No User</div>
      ) : (
        <div>
          {!tracks ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {tracks.map((track, index) => (
                <li
                  key={index}
                >{`${track.name}  URL -------->  ${track.external_urls}`}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Reccomendations;
