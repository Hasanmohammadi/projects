import { Button, RadioButton } from 'Common';
import { useGetStayTypeList } from 'Hooks/Stay';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'react-feather';

interface NewStayModalPropsI {
  onCancel: () => void;
  onContinue: (radioValue: { radioText: string; value: string }) => void;
}

export default function NewStayModal({
  onContinue,
  onCancel,
}: NewStayModalPropsI) {
  const [radioValue, setRadioValue] = useState({
    radioText: '',
    value: '',
  });

  const { stayTypeList } = useGetStayTypeList();

  useEffect(() => {
    const radioInfo = stayTypeList?.data.find(
      (v) => v.id === radioValue.value,
    );
    setRadioValue({
      radioText: radioInfo?.name as string,
      value: radioInfo?.id as string,
    });
  }, [radioValue.value]);

  return (
    <div>
      <div className="bg-Success/50 w-12 h-12 flex justify-center items-center rounded-full">
        <CheckCircle color="#039855" />
      </div>
      <div className="mt-5">
        <h1 className="font-semibold text-lg text-gray-900">New Stay</h1>
        <p className="font-normal text-sm text-gray-500">
          Choose one of the options below to add a new stay.
        </p>
      </div>
      <RadioButton
        className="mt-5"
        radios={stayTypeList?.data.map(({ name, id }) => ({
          radioText: name,
          value: id,
        }))}
        onChange={(e, value) => {
          setRadioValue({ value, radioText: '' });
        }}
      />
      <div className="mt-8 flex w-full justify-center gap-3">
        <Button
          color="ghost"
          className="w-full h-full"
          containerClassName="w-full h-11"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          disabled={!radioValue.value}
          color="primary"
          className="w-full h-full"
          onClick={() => onContinue(radioValue)}
          containerClassName="w-full h-11"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
