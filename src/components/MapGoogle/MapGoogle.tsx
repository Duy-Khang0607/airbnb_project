import React, { useMemo } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

type Props = {};

export default function MapGoogle({}: Props) {
  const center = useMemo(
    () => ({
      lat: 44,
      lng: -80,
    }),
    []
  );

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }} className='rounded-lg'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={center}
        defaultZoom={10}>
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text={<i className='fa fa-map-marker-alt text-red-600 text-xl'></i>}
        />
      </GoogleMapReact>
    </div>
  );
}
