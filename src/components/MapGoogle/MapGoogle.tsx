import React, { useMemo } from "react";
import GoogleMapReact from "google-map-react";
import Map from "react-map-gl";
import ReactMapGL from "react-map-gl";
const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

type Props = {};

export default function MapGoogle({}: Props) {
  const [viewPort, setViewPort] = React.useState({
    width: "100vw",
    height: "100vh",
    latitude: 21.0244246,
    longitude: 105.7938072,
    zoom: 16,
  });
  const center = useMemo(
    () => ({
      lat: 44,
      lng: -80,
    }),
    []
  );

  return (
    // <div className='rounded-lg w-full h-full'>
    //   <GoogleMapReact
    //     bootstrapURLKeys={{ key: "" }}
    //     defaultCenter={center}
    //     defaultZoom={10}>
    //     <AnyReactComponent
    //       lat={59.955413}
    //       lng={30.337844}
    //       text={<i className='fa fa-map-marker-alt text-red-600 text-xl'></i>}
    //     />
    //   </GoogleMapReact>
    // </div>
    // <ReactMapGL
    //   {...viewPort}
    //   mapStyle='mapbox://styles/mapbox/streets-v11'
    //   mapboxApiAccessToken='pk.ey.J1IjoidHJ1bmdwaGFuOTkiLCJhIjoiY2txZmI3cD15MG42ODJvc2N1emRqcndqYyJ9.-QdtnY-bLP8PSXMwwXuQEA'></ReactMapGL>
    // <Map
    //   {...viewPort}
    //   mapStyle='mapbox://styles/mapbox/streets-v11'
    //   mapboxAccessToken='pk.ey.J1IjoidHJ1bmdwaGFuOTkiLCJhIjoiY2txZmI3cD15MG42ODJvc2N1emRqcndqYyJ9.-QdtnY-bLP8PSXMwwXuQEA'
    // />
    <>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.497076796882!2d106.76901307580799!3d10.84974675783544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527a03a6378c5%3A0xb4a838949a4175c8!2zMSDEkC4gVsO1IFbEg24gTmfDom4sIExpbmggQ2hp4buDdSwgVGjhu6cgxJDhu6ljLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1680591305461!5m2!1svi!2s'
        className='w-full h-full rounded-tl-lg rounded-bl-lg'
        // allowfullscreen=''
        loading='lazy'
        // referrerpolicy='no-referrer-when-downgrade'
      ></iframe>
    </>
  );
}
