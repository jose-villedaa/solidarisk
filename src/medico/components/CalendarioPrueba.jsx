import React from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export const CalendarioPrueba = () => {
    return (
        <>
            <div
                style={{
                    textAlign: "center",
                    opacity: "100%",
                    marginBottom: "20px",
                    backgroundColor: "#E74C3C",
                    color: "#FFFFFF",
                    paddingBottom: "1px",
                    paddingTop: "15px"
                }}
            >
                <h1 className="mb-4">Calendario</h1>
            </div>

            <div className='calendar'>
                <div className='header'>
                    <button className='lastYear'>&lt;&lt;</button>
                    <button className='lastMonth'>&lt;</button>  
                    <div className="currentDate">2023-01-07</div>
                    <button className='nextMonth'>&gt;</button>
                    <button className='nextYear'>&gt;&gt;</button>
                </div>

                <div className='days'>
                    <div className='day'>Lun</div>
                    <div className='day'>Mar</div>
                    <div className='day'>Mier</div>
                    <div className='day'>Jue</div>
                    <div className='day'>Vier</div>
                    <div className='day'>Sab</div>
                    <div className='day'>Dom</div>
                </div>

                <div className='dates'>
                    <button className='date'>1</button>
                    <button className='date'>2</button>
                    <button className='date'>3</button>
                    <button className='date'>4</button>
                    <button className='date'>5</button>
                    <button className='date'>6</button>
                    <button className='date'>7</button>
                    <button className='date'>8</button>
                    <button className='date'>9</button>
                    <button className='date'>9</button>
                    <button className='date'>9</button>
                    <button className='date'>10</button>
                    <button className='date'>11</button>
                    <button className='date'>12</button>
                    <button className='date'>13</button>
                    <button className='date'>14</button>
                    <button className='date'>15</button>
                    <button className='date'>16</button>
                    <button className='date'>17</button>
                    <button className='date'>18</button>
                    <button className='date'>19</button>
                    <button className='date'>20</button>
                    <button className='date'>21</button>
                    <button className='date'>22</button>
                    <button className='date'>23</button>
                    <button className='date'>24</button>
                    <button className='date'>25</button>
                    <button className='date'>26</button>
                    <button className='date'>27</button>
                    <button className='date'>28</button>
                    <button className='date'>29</button>
                    <button className='date'>30</button>
                    <button className='date'>31</button>
                    <button className='date'>32</button>
                    <button className='date'>33</button>
                    <button className='date'>34</button>
                    <button className='date'>35</button>
                    <button className='date'>36</button>
                    <button className='date'>37</button>
                    <button className='date'>38</button>
                    <button className='date'>39</button>
                    <button className='date'>40</button>
                    <button className='date'>41</button>
                    <button className='date'>42</button>
                </div>

            </div>
        </>
    )
}
