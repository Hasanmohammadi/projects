import { EditVendorLoading, Tabs } from 'Common';
import { useAppContext } from 'Context';
import { convertApiStayData } from 'Helpers/stay';
import { useGetStayInformation } from 'Hooks/Stay';
import { StayInformationResultI } from 'Types/Stay';
import { useEffect, useState } from 'react';
import { Params, useNavigate, useParams } from 'react-router-dom';

import StayDescription from '../NewStay/AddStay/StayDescription/StayDescription';
import StayFacilities from '../StayFacilities';
import StayInformation from '../StayInformation';
import StayPhotos from '../StayPhotos';
import StayPolicy from '../StayPolicy';

export default function EditStay() {
  const navigate = useNavigate();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { stay }: { stay?: Readonly<Params<string>> } = useParams();

  const { vendorIdSelected } = useAppContext();

  useEffect(() => {
    if (vendorIdSelected?.length < 23) {
      navigate('/stays');
    }
  }, []);

  const {
    stayInformationData,
    isLoading,
    error,
    getStayInformationAction,
  } = useGetStayInformation({
    hotelId: stay as unknown as string,
    VendorId: vendorIdSelected,
  });

  const { note } = stayInformationData ?? {};

  return (
    <>
      {!error?.message && (
        <div>
          <h1 className="text-gray-900 font-medium text-3xl">
            Edit {note as string}
          </h1>
          {isLoading ? (
            <EditVendorLoading />
          ) : (
            <Tabs
              activeTab={activeTabIndex}
              setActiveTabIndex={setActiveTabIndex}
              className="mt-6"
              tabs={[
                {
                  name: `${note as string} Information`,
                  children: (
                    <StayInformation
                      stayName={stay as unknown as string}
                      setActiveTabIndex={setActiveTabIndex}
                      isEdit
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
                      stayName={note as string}
                      defaultValue={
                        convertApiStayData(
                          stayInformationData as StayInformationResultI,
                        ).facilities
                      }
                    />
                  ),
                },
                {
                  name: 'Policy',
                  children: (
                    <StayPolicy
                      setActiveTabIndex={setActiveTabIndex}
                      defaultValue={
                        convertApiStayData(
                          stayInformationData as StayInformationResultI,
                        ).policy
                      }
                    />
                  ),
                },
                {
                  name: 'Descriptions',
                  children: (
                    <StayDescription
                      hotelId={stay as unknown as string}
                      setActiveTabIndex={setActiveTabIndex}
                    />
                  ),
                },
                {
                  name: 'Photos',
                  children: (
                    <StayPhotos
                      defaultValue={
                        convertApiStayData(
                          stayInformationData as StayInformationResultI,
                        ).hotelPhotos
                      }
                      getStayInformationAction={getStayInformationAction}
                      setActiveTabIndex={setActiveTabIndex}
                    />
                  ),
                },
              ]}
            />
          )}
        </div>
      )}
    </>
  );
}
