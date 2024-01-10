import { Button, Modal } from 'Common';
import { useAppContext } from 'Context';
import { useDeleteStay, useDeleteStayPhoto } from 'Hooks/Stay';
import usePatchChangeStayStatus from 'Hooks/Stay/usePatchChangeStayStatus';
import { HotelPhotosInfoI, StayInformationResultI } from 'Types/Stay';
import { useState } from 'react';
import { CheckCircle, Plus, Trash2, XCircle } from 'react-feather';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { useNavigate } from 'react-router-dom';

import AddPhotoModal from './AddPhotoModal';

interface StayPhotosPropsI {
  defaultValue?: HotelPhotosInfoI[];
  getStayInformationAction?: <TPageData>(
    options?:
      | (RefetchOptions & RefetchQueryFilters<TPageData>)
      | undefined,
  ) => Promise<QueryObserverResult<StayInformationResultI, Error>>;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
  checkStayMode?: boolean;
}

export default function StayPhotos({
  defaultValue,
  getStayInformationAction,
  setActiveTabIndex,
  checkStayMode = false,
}: StayPhotosPropsI) {
  const { hotelId } = useAppContext();
  const [photoId, setPhotoId] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deletePhotoModalIsOpen, setDeletePhotoModalIsOpen] =
    useState(false);

  const navigate = useNavigate();

  const { deleteStayAction, deleteStayLoading } = useDeleteStay({
    onSuccess: () => {
      setDeleteModalOpen(false);
      navigate('/manage-stays');
      if (getStayInformationAction) {
        getStayInformationAction().catch((err) => console.log(err));
      }
    },
  });

  const { deletePhotoLoading, deleteStayPhotoAction } = useDeleteStayPhoto(
    {
      onSuccess: () => {
        setDeletePhotoModalIsOpen(false);
        if (getStayInformationAction) {
          getStayInformationAction().catch((err) => console.log(err));
        }
      },
    },
  );

  const { changeStayStatusAction, changeStatusLoading } =
    usePatchChangeStayStatus({
      onSuccess: () => {
        setDeleteModalOpen(false);
        navigate('/manage-stays');
      },
    });

  const onDeleteStayPhoto = ({ stayPhotoId }: { stayPhotoId: string }) => {
    setDeletePhotoModalIsOpen(false);
    deleteStayPhotoAction({ photoId: stayPhotoId, stayId: hotelId });
  };

  return (
    <>
      <div className="mt-8 flex justify-between w-full border-b border-b-gray-200 pb-5">
        <div>
          <p className="text-lg font-medium text-gray-900">Photos</p>
        </div>
        {!checkStayMode && (
          <div className="flex flex-wrap flex-row-reverse mt-4 gap-3">
            <Button
              color="primary"
              className="h-10 px-4"
              type="submit"
              onClick={() => navigate('/stays')}
            >
              <div className="flex flex-wrap gap-2">Save</div>
            </Button>
            <Button
              color="ghost"
              className="h-10 px-4"
              onClick={() => setActiveTabIndex((pre) => pre - 1)}
            >
              <div className="flex flex-wrap gap-2">Back</div>
            </Button>
          </div>
        )}
        {checkStayMode && (
          <div className="flex flex-wrap flex-row-reverse mt-4 gap-3">
            <Button
              color="success"
              className="h-10 px-4"
              type="submit"
              onClick={() => setConfirmModalOpen(true)}
              loading={changeStatusLoading}
            >
              <div className="flex flex-wrap gap-2">Confirm Stay</div>
            </Button>
            <Button
              color="error"
              className="h-10 px-4"
              onClick={() => setDeleteModalOpen(true)}
              loading={deleteStayLoading}
            >
              <div className="flex flex-wrap gap-2">Delete Stay</div>
            </Button>
          </div>
        )}
      </div>
      <div className="mt-6 w-full flex justify-end">
        <Button color="secondary" onClick={() => setModalIsOpen(true)}>
          <div className="flex">
            <Plus size={20} className="mt-0.5 mr-1" />
            <span className="text-base font-medium">Add image</span>
          </div>
        </Button>
      </div>
      <div>
        {defaultValue?.map(({ id, urls, categoryName }) => (
          <div key={id} className="my-6">
            <h1 className="mb-3 font-medium">{categoryName}</h1>
            <div className="grid grid-cols-5">
              {urls.map(({ id: stayPhotoId, link, name }) => (
                <div
                  key={stayPhotoId}
                  className="border border-gray-200 p-4 rounded-lg w-fit"
                >
                  <div className="mb-4 flex justify-end">
                    <Trash2
                      color="#b00020"
                      className="cursor-pointer"
                      onClick={() => {
                        setPhotoId(stayPhotoId);
                        setDeletePhotoModalIsOpen(true);
                      }}
                    />
                  </div>
                  <img src={link} alt={link} className="w-48 h-36" />
                  <p className="border-t border-t-gray-200 pt-2 mt-4 text-sm">
                    {name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <AddPhotoModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        getStayInformationAction={getStayInformationAction}
      />

      <Modal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
      >
        <div className="w-96">
          <p className="font-medium text-lg text-gray-900 w-full text-center">
            Are you sure to confirm this stay ?
          </p>
          <div className="w-full flex mt-6">
            <CheckCircle className="m-auto" size={50} color="#4bb543" />
          </div>
          <div className="flex gap-3 w-full justify-between mt-8">
            <Button
              className="w-full"
              color="ghost"
              onClick={() => setConfirmModalOpen(false)}
              containerClassName="w-full"
            >
              Cancel
            </Button>
            <Button
              className="w-full"
              color="success"
              onClick={() => changeStayStatusAction({ stayId: hotelId })}
              containerClassName="w-full"
              loading={changeStatusLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <div className="w-96">
          <p className="font-medium text-lg text-gray-900 w-full text-center">
            Are you sure to delete this stay ?
          </p>
          <div className="w-full flex mt-6">
            <XCircle className="m-auto" size={50} color="#b00020" />
          </div>
          <div className="flex gap-3 w-full justify-between mt-8">
            <Button
              className="w-full"
              color="ghost"
              onClick={() => setDeleteModalOpen(false)}
              containerClassName="w-full"
            >
              Cancel
            </Button>
            <Button
              className="w-full"
              color="error"
              onClick={() => deleteStayAction({ stayId: hotelId })}
              containerClassName="w-full"
              loading={deleteStayLoading}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={deletePhotoModalIsOpen}
        onClose={() => setDeletePhotoModalIsOpen(false)}
      >
        <div className="w-96">
          <p className="font-medium text-lg text-gray-900 w-full text-center">
            Are you sure to delete this photo ?
          </p>
          <div className="w-full flex mt-6">
            <XCircle className="m-auto" size={50} color="#b00020" />
          </div>
          <div className="flex gap-3 w-full justify-between mt-8">
            <Button
              className="w-full"
              color="ghost"
              onClick={() => {
                setPhotoId('');
                setDeletePhotoModalIsOpen(false);
              }}
              containerClassName="w-full"
            >
              Cancel
            </Button>
            <Button
              className="w-full"
              color="error"
              onClick={() => onDeleteStayPhoto({ stayPhotoId: photoId })}
              containerClassName="w-full"
              loading={deletePhotoLoading}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
