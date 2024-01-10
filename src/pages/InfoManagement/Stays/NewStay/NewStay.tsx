import { EditVendorLoading, Tabs } from 'Common';
import { useAppContext } from 'Context';
import { capitalizeFirstLetter } from 'Helpers';
import { convertApiStayData } from 'Helpers/stay';
import { useGetStayInformation } from 'Hooks/Stay';
import { StayInformationResultI } from 'Types/Stay';
import { useEffect, useState } from 'react';
import { Params, useNavigate, useParams } from 'react-router-dom';

import StayFacilities from '../StayFacilities';
import StayInformation from '../StayInformation';
import StayPhotos from '../StayPhotos';
import StayDescription from './AddStay/StayDescription/StayDescription';

interface NewStayPropsI {
  checkStayMode?: boolean;
}

export default function NewStay({ checkStayMode }: NewStayPropsI) {
  const { vendorIdSelected, hotelId, setHotelId } = useAppContext();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [finalData, setFinalData] =
    useState<StayInformationResultI | null>();
  const [maxTabIndex, setMaxTabIndex] = useState(0);

  const { stay }: { stay?: Readonly<Params<string>> } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (vendorIdSelected.length < 23 && !checkStayMode) {
      navigate('/stays');
    }

    return () => setHotelId('');
  }, []);

  const { getStayInformationAction, stayInformationData, isLoading } =
    useGetStayInformation({
      hotelId,
      VendorId: checkStayMode ? '' : vendorIdSelected,
    });

  useEffect(() => {
    if (!isLoading) {
      setFinalData(stayInformationData);
    }
  }, [isLoading]);

  useEffect(() => {
    if (maxTabIndex < activeTabIndex) {
      setMaxTabIndex(activeTabIndex);
    }
  }, [activeTabIndex]);

  const { note } = finalData ?? {};

  const stayName = note || stay;
  return (
    <div>
      {finalData === undefined ? (
        <EditVendorLoading />
      ) : (
        <>
          <h1 className="text-gray-900 font-medium text-3xl">
            {` ${capitalizeFirstLetter(stayName as string)}`}
          </h1>

          <Tabs
            activeTab={activeTabIndex}
            setActiveTabIndex={setActiveTabIndex}
            className="mt-6"
            tabs={[
              {
                name: `${stayName as string} Information`,
                children: (
                  <StayInformation
                    stayName={stayName}
                    setActiveTabIndex={setActiveTabIndex}
                    isEdit={!!stayInformationData?.note}
                    inputsDefaultValue={
                      convertApiStayData(
                        stayInformationData as StayInformationResultI,
                      ).stayInfo
                    }
                  />
                ),
              },
              {
                name: 'Facilities',
                children: (
                  <StayFacilities
                    setActiveTabIndex={setActiveTabIndex}
                    stayName={stayName as string}
                    defaultValue={
                      convertApiStayData(
                        stayInformationData as StayInformationResultI,
                      ).facilities
                    }
                  />
                ),
                disabled: stayInformationData ? false : maxTabIndex < 1,
              },
              {
                name: 'Descriptions',
                children: (
                  <StayDescription
                    setActiveTabIndex={setActiveTabIndex}
                    hotelId={hotelId}
                  />
                ),
                disabled: stayInformationData ? false : maxTabIndex < 3,
              },
              {
                name: 'Photos',
                children: (
                  <StayPhotos
                    getStayInformationAction={getStayInformationAction}
                    defaultValue={
                      convertApiStayData(
                        stayInformationData as StayInformationResultI,
                      ).hotelPhotos
                    }
                    setActiveTabIndex={setActiveTabIndex}
                    checkStayMode={checkStayMode}
                  />
                ),
                disabled: stayInformationData ? false : maxTabIndex < 4,
              },
            ]}
          />
        </>
      )}
    </div>
  );
}
