

import React, { useState, useEffect } from 'react';

import EventTag from './EventTag';

import config from '../config';

import getContextRemarks from '../helpers/timeContext';
import getTag from '../helpers/eventTags';

const Event = ({ event, forDate, compact }) => {

  const [ start, setStart ] = useState(null);
  const [ end, setEnd ] = useState(null);
  const [ tag, setTag ] = useState(undefined);
  const [ summary, setSummary ] = useState('');

  useEffect(() => {

    const startDate = new Date(event.start.dateTime || `${event.start.date}T00:00:00`);
    const endDate = new Date(event.end.dateTime || `${event.end.date}T00:00:00`);

    const [ startRemarks, endRemarks ] = getContextRemarks(forDate, [startDate, endDate]);

    setStart(startRemarks);
    // only set end time if not compact or no startRemarks
    if (endRemarks && (!compact || !startRemarks)) {
      setEnd(endRemarks);
    }

    setTag(getTag(event));
    setSummary(event.summary);

  }, [event, forDate, compact]);

  return (
    <div className="event">
      { (start || end) &&
        <div className="event--time muted">
          { start && <p>{ start }</p> }
          { end && <p>{ end }</p> }
        </div>
      }

      <div className="event--details">
        { tag && <EventTag tag={ tag } /> }
        <h3 className="event--summary">{ summary }</h3>
      </div>
    </div>
  );
};

export default Event;
