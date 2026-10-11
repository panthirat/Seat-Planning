// รายชื่อห้องเรียน และโค้ดสีตัดกันชัดเจน
const CLASS_LIST = [
    // Grade 7
    { id: '7A', name: '7 Archimedes (7A)', color: '#00f2fe' },
    { id: '7E', name: '7 Einstein (7E)', color: '#ff0055' },
    { id: '7F', name: '7 Franklin (7F)', color: '#2563eb' },
    { id: '7Lang', name: '7 Lang', color: '#fbbf24' },
    { id: '7N', name: '7 Newton (7N)', color: '#a855f7' },
    { id: '7P', name: '7 Pasteur (7P)', color: '#84cc16' },
    { id: '7T', name: '7 Tesla (7T)', color: '#ec4899' },
    
    // Grade 8
    { id: '8A', name: '8 Austen (8A)', color: '#f97316' },
    { id: '8B', name: '8 Byron (8B)', color: '#06b6d4' },
    { id: '8H', name: '8 Hemingway (8H)', color: '#15803d' },
    { id: '8Lang', name: '8 Lang', color: '#e11d48' },
    { id: '8S', name: '8 Shakespeare (8S)', color: '#facc15' },
    { id: '8W', name: '8 Wordsworth (8W)', color: '#4f46e5' },

    // Grade 9
    { id: '9B', name: '9 Beethoven (9B)', color: '#f43f5e' },
    { id: '9G', name: '9 Gershwin (9G)', color: '#0ea5e9' },
    { id: '9H', name: '9 Haydn (9H)', color: '#7c3aed' },
    { id: '9M', name: '9 Mozart (9M)', color: '#ff7675' },
    { id: '9S', name: '9 Schubert (9S)', color: '#10b981' },

    // Grade 10
    { id: '10L', name: '10 Leonardo (10L)', color: '#d97706' },
    { id: '10M', name: '10 Monet (10M)', color: '#16a34a' },
    { id: '10P', name: '10 Picasso (10P)', color: '#ea580c' },
    { id: '10V', name: '10 Van Gogh (10V)', color: '#9333ea' },

    // Grade 11
    { id: '11A', name: '11 Aristotle (11A)', color: '#0284c7' },
    { id: '11P', name: '11 Plato (11P)', color: '#1d4ed8' },
    { id: '11S', name: '11 Socrates (11S)', color: '#dc2626' },
    { id: '11V', name: '11 Voltaire (11V)', color: '#059669' },

    // Grade 12
    { id: '12G', name: '12 Gryphon (12G)', color: '#db2777' },
    { id: '12M', name: '12 Merlion (12M)', color: '#7e22ce' },
    { id: '12P', name: '12 Phoenix (12P)', color: '#c05621' },
    { id: '12U', name: '12 Unicorn (12U)', color: '#6366f1' },

    // Special Groups
    { id: 'Council', name: 'Student council (สภานักเรียน)', color: '#ef4444' },
    { id: 'VIP', name: 'VIP', color: '#ffd700' },
    { id: 'SMT', name: 'SMT', color: '#ff007f' },
    { id: 'PST', name: 'PST', color: '#f472b6' },
    { id: 'Teacher', name: 'Teacher', color: '#991b1b' }
];

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
const totalCols = 29;

let seatData = {};
let isClassLabelsVisible = false;

function isControlBooth(row, num) {
    return ['I', 'J', 'K', 'L'].includes(row) && (num >= 12 && num <= 18);
}

function populateClassSelect() {
    const select = document.getElementById('class-select');
    const legendContainer = document.getElementById('legend-container');
    select.innerHTML = '';
    legendContainer.innerHTML = '';

    CLASS_LIST.forEach(cls => {
        const opt = document.createElement('option');
        opt.value = cls.id;
        opt.innerText = cls.name;
        select.appendChild(opt);

        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `<div class="legend-box" style="background:${cls.color}"></div><span>${cls.id}</span>`;
        legendContainer.appendChild(legendItem);
    });
}

function initGrid() {
    populateClassSelect();
    const gridContainer = document.getElementById('seating-grid');
    gridContainer.innerHTML = '';
    let validSeatCount = 0;

    rows.forEach(row => {
        if (row === 'I') {
            const aisle = document.createElement('div');
            aisle.className = 'aisle-gap';
            aisle.innerText = '🚶‍♂️ ทางเดินพักแยกระหว่างแถว (MAIN AISLE WALKWAY) 🚶‍♀️';
            gridContainer.appendChild(aisle);
        }

        const rowDiv = document.createElement('div');
        rowDiv.className = 'row-container';

        const leftLabel = document.createElement('div');
        leftLabel.className = 'row-label';
        leftLabel.innerText = row;
        rowDiv.appendChild(leftLabel);

        const leftBlock = document.createElement('div');
        leftBlock.className = 'block-section block-side';
        for (let i = 29; i >= 23; i--) createSeatElement(row, i, leftBlock);

        const centerBlock = document.createElement('div');
        centerBlock.className = 'block-section block-center';
        for (let i = 22; i >= 8; i--) createSeatElement(row, i, centerBlock);

        const rightBlock = document.createElement('div');
        rightBlock.className = 'block-section block-side';
        for (let i = 7; i >= 1; i--) createSeatElement(row, i, rightBlock);

        rowDiv.appendChild(leftBlock);
        rowDiv.appendChild(centerBlock);
        rowDiv.appendChild(rightBlock);

        const rightLabel = document.createElement('div');
        rightLabel.className = 'row-label';
        rightLabel.innerText = row;
        rowDiv.appendChild(rightLabel);

        gridContainer.appendChild(rowDiv);
    });

    rows.forEach(r => {
        for (let c = 1; c <= totalCols; c++) {
            if (!isControlBooth(r, c)) validSeatCount++;
        }
    });
    document.getElementById('total-seats').innerText = validSeatCount;
    updateDashboard();
}

function createSeatElement(row, num, parent) {
    const seatId = `${row}${num}`;
    const seat = document.createElement('div');
    seat.className = 'seat';
    seat.id = `seat-${seatId}`;
    seat.innerHTML = `<span class="seat-code">${num}</span><span class="seat-class-tag" id="tag-${seatId}"></span>`;

    if (isControlBooth(row, num)) {
        seat.classList.add('booth');
        seat.innerHTML = `<span class="seat-code">BOOTH</span>`;
        const tooltip = document.createElement('div');
        tooltip.className = 'seat-tooltip';
        tooltip.innerHTML = `<strong>${seatId}</strong>: Control Booth (งดใช้ที่นั่ง)`;
        seat.appendChild(tooltip);
    } else {
        seat.draggable = true;
        seat.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', seatId));
        seat.addEventListener('dragover', (e) => e.preventDefault());
        seat.addEventListener('drop', (e) => handleDrop(e, seatId));
        seat.addEventListener('click', () => editSingleSeat(seatId));

        const tooltip = document.createElement('div');
        tooltip.className = 'seat-tooltip';
        tooltip.id = `tooltip-${seatId}`;
        tooltip.innerHTML = `<strong>ที่นั่ง ${seatId}</strong><br>สถานะ: ว่าง`;
        seat.appendChild(tooltip);
    }

    parent.appendChild(seat);
}

function toggleClassLabelsOverview() {
    isClassLabelsVisible = !isClassLabelsVisible;
    const wrapper = document.getElementById('seating-wrapper');
    const btn = document.getElementById('toggle-label-btn');

    if (isClassLabelsVisible) {
        wrapper.classList.add('show-class-labels');
        btn.classList.add('btn-active');
        btn.innerText = '👁️ ซ่อนชื่อห้องบนผังภาพรวม';
    } else {
        wrapper.classList.remove('show-class-labels');
        btn.classList.remove('btn-active');
        btn.innerText = '👁️ แสดงชื่อห้องบนผังภาพรวม';
    }
}

function allocateGroup() {
    const classId = document.getElementById('class-select').value;
    const count = parseInt(document.getElementById('group-count').value);
    const mode = document.getElementById('allocation-mode').value;
    const isBufferEnabled = document.getElementById('buffer-zone-check').checked;

    const classObj = CLASS_LIST.find(c => c.id === classId);
    if (!classObj || isNaN(count) || count <= 0) {
        alert('กรุณาระบุจำนวนคนที่ถูกต้อง');
        return;
    }

    let seatSequence = [];

    if (mode === 'HORIZ_1_TO_29') {
        rows.forEach(r => {
            for (let c = 1; c <= totalCols; c++) {
                const id = `${r}${c}`;
                if (!isControlBooth(r, c) && !seatData[id]) seatSequence.push(id);
            }
        });
    } 
    else if (mode === 'HORIZ_29_TO_1') {
        rows.forEach(r => {
            for (let c = totalCols; c >= 1; c--) {
                const id = `${r}${c}`;
                if (!isControlBooth(r, c) && !seatData[id]) seatSequence.push(id);
            }
        });
    }
    else {
        const getZoneCols = (zone) => {
            if (zone === 'RIGHT') return [1, 2, 3, 4, 5, 6, 7];
            if (zone === 'CENTER') return [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
            if (zone === 'LEFT') return [23, 24, 25, 26, 27, 28, 29];
        };

        let zoneOrder = [];
        if (mode === 'ZONE_RIGHT_VER') zoneOrder = ['RIGHT', 'CENTER', 'LEFT'];
        else if (mode === 'ZONE_CENTER_VER') zoneOrder = ['CENTER', 'RIGHT', 'LEFT'];
        else zoneOrder = ['LEFT', 'CENTER', 'RIGHT'];

        zoneOrder.forEach(z => {
            const cols = getZoneCols(z);
            rows.forEach(r => {
                cols.forEach(c => {
                    const id = `${r}${c}`;
                    if (!isControlBooth(r, c) && !seatData[id]) seatSequence.push(id);
                });
            });
        });
    }

    if (isBufferEnabled && seatSequence.length > 0 && Object.keys(seatData).length > 0) {
        seatSequence.shift();
    }

    if (seatSequence.length < count) {
        alert(`ที่นั่งว่างไม่พอ! เหลือที่นั่งว่างเพียง ${seatSequence.length} ที่`);
        return;
    }

    const assigned = seatSequence.slice(0, count);
    assigned.forEach(seatId => {
        seatData[seatId] = { classId: classObj.id, className: classObj.name, color: classObj.color };
        renderSeat(seatId);
    });

    updateDashboard();
    document.getElementById('group-count').value = '';
}

function renderSeat(seatId) {
    const seatEl = document.getElementById(`seat-${seatId}`);
    const tagEl = document.getElementById(`tag-${seatId}`);
    const tooltipEl = document.getElementById(`tooltip-${seatId}`);
    if (!seatEl) return;

    if (seatData[seatId]) {
        const data = seatData[seatId];
        seatEl.style.backgroundColor = data.color;
        seatEl.style.color = '#ffffff';
        if (tagEl) tagEl.innerText = data.classId;
        if (tooltipEl) {
            tooltipEl.innerHTML = `<strong>ที่นั่ง ${seatId}</strong><br>สังกัด: ${data.className}`;
        }
    } else {
        seatEl.style.backgroundColor = 'var(--seat-empty)';
        seatEl.style.color = '#cbd5e1';
        if (tagEl) tagEl.innerText = '';
        if (tooltipEl) {
            tooltipEl.innerHTML = `<strong>ที่นั่ง ${seatId}</strong><br>สถานะ: ว่าง`;
        }
    }
}

function handleDrop(e, targetSeatId) {
    e.preventDefault();
    const sourceSeatId = e.dataTransfer.getData('text/plain');
    if (sourceSeatId === targetSeatId) return;

    const temp = seatData[sourceSeatId];
    seatData[sourceSeatId] = seatData[targetSeatId];
    seatData[targetSeatId] = temp;

    renderSeat(sourceSeatId);
    renderSeat(targetSeatId);
    updateDashboard();
}

function editSingleSeat(seatId) {
    const currentData = seatData[seatId];
    const currentName = currentData ? currentData.className : 'ว่าง';
    
    const action = prompt(
        `📌 รายละเอียดที่นั่ง: ${seatId}\n` +
        `ผู้ครองที่นั่งปัจจุบัน: ${currentName}\n\n` +
        `กรุณากรอกรหัสห้องใหม่ (เช่น 7A, 8B, Council, VIP) เพื่อเปลี่ยน\n` +
        `หรือพิมพ์ 'clear' เพื่อยกเลิกการจองที่นั่งนี้:`,
        currentData ? currentData.classId : ''
    );

    if (action === null) return;

    const trimmed = action.trim();
    if (trimmed.toLowerCase() === 'clear' || trimmed === '') {
        delete seatData[seatId];
    } else {
        const found = CLASS_LIST.find(c => c.id.toLowerCase() === trimmed.toLowerCase());
        if (found) {
            seatData[seatId] = { classId: found.id, className: found.name, color: found.color };
        } else {
            seatData[seatId] = { classId: trimmed, className: trimmed, color: '#3b82f6' };
        }
    }
    renderSeat(seatId);
    updateDashboard();
}

function searchSeats() {
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    
    rows.forEach(r => {
        for (let c = 1; c <= totalCols; c++) {
            const id = `${r}${c}`;
            const seatEl = document.getElementById(`seat-${id}`);
            if (!seatEl || isControlBooth(r, c)) continue;

            if (query && seatData[id] && (seatData[id].classId.toLowerCase().includes(query) || seatData[id].className.toLowerCase().includes(query))) {
                seatEl.classList.add('highlight');
            } else {
                seatEl.classList.remove('highlight');
            }
        }
    });
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    searchSeats();
}

function updateDashboard() {
    const total = parseInt(document.getElementById('total-seats').innerText) || 436;
    const allocated = Object.keys(seatData).length;
    const remaining = total - allocated;
    const rate = Math.round((allocated / total) * 100) || 0;

    document.getElementById('allocated-seats').innerText = allocated;
    document.getElementById('remaining-seats').innerText = remaining;
    document.getElementById('occupancy-rate').innerText = `${rate}%`;
    document.getElementById('progress-fill').style.width = `${rate}%`;
}

function resetAllSeats() {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการล้างที่นั่งทั้งหมด?')) {
        seatData = {};
        rows.forEach(r => {
            for (let c = 1; c <= totalCols; c++) {
                const id = `${r}${c}`;
                if (!isControlBooth(r, c)) renderSeat(id);
            }
        });
        updateDashboard();
        clearSearch();
    }
}

window.onload = initGrid;
