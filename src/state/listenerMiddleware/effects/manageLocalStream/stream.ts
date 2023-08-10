let localStream: MediaStream | null;

export const setLocalStream = (value: MediaStream | null) => {
  localStream = value;
};

export const getLocalStream = () => localStream;
