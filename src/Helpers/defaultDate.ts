import convertUtcToDate from './convertUtcToDate';

const now = new Date();

const isoString = now.toISOString();

const defaultDate = () => ({
  from: convertUtcToDate(isoString),
  to: {
    ...convertUtcToDate(isoString),
    month: convertUtcToDate(isoString).month + 1,
  },
});

export default defaultDate;
