const mahasiswa = [
    { nim: "123220001", nama: "Bahlil Lahdalah", gender: "Laki-Laki" },
    { nim: "123220011", nama: "Puan Mahaputri", gender: "Perempuan" },
    { nim: "123220111", nama: "Teddy Indra Jatmiko", gender: "Perempuan" }
];

if (!localStorage.getItem("mahasiswa")) {
    localStorage.setItem("mahasiswa", JSON.stringify(mahasiswa));
}

function getMahasiswa() {
    return JSON.parse(localStorage.getItem("mahasiswa"));
}

function saveMahasiswa(data) {
    localStorage.setItem("mahasiswa", JSON.stringify(data));
}

function renderTabel() {
    const tbody = document.getElementById("studentTbody");
    if (!tbody) return;

    const data = getMahasiswa();
    tbody.innerHTML = "";

    data.forEach((mhs, index) => {
        tbody.innerHTML += `
        <tr>
            <td class="bg-light text-black">${index + 1}</td>
            <td class="bg-light text-black">${mhs.nim}</td>
            <td class="bg-light text-black">${mhs.nama}</td>
            <td class="bg-light text-black">${mhs.gender}</td>
            <td class="bg-light">
                <button class="btn btn-sm btn-primary">Update</button>
                <button class="btn btn-sm btn-danger" onclick="deleteStudent(${index})" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
            </td>
        </tr>
        `;
    });
}


let deleteIndex = -1;
function deleteStudent(index) {
    deleteIndex = index;
}

document.getElementById("confirmDelete")?.addEventListener("click", () => {
    let mahasiswa = getMahasiswa();
    mahasiswa.splice(deleteIndex, 1);
    saveMahasiswa(mahasiswa);
    renderTabel();
    let modal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
    modal.hide();
});

document.getElementById("searchInput")?.addEventListener("keyup", function () {
    let value = this.value.toLowerCase();
    const data = getMahasiswa();
    let tbody = document.getElementById("studentTbody");
    tbody.innerHTML = "";

    data
        .filter(
            (mhs) =>
                mhs.nim.toLowerCase().includes(value) ||
                mhs.nama.toLowerCase().includes(value)
        )
        .forEach((mhs, index) => {
            tbody.innerHTML += `
            <tr>
            <td>${index + 1}</td>
            <td>${mhs.nim}</td>
            <td>${mhs.nama}</td>
            <td>${mhs.gender}</td>
            <td>
                <button class="btn btn-sm btn-primary">Update</button>
                <button class="btn btn-sm btn-danger" onclick="deleteStudent(${index})" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
            </td>
            </tr>
        `;
        });
});

document.getElementById("studentForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    let nim = document.getElementById("nim").value;
    let nama = document.getElementById("nama").value;
    let gender = document.querySelector('input[name="gender"]:checked').value;

    let data = getMahasiswa();
    data.push({ nim, nama, gender });
    saveMahasiswa(data);

    alert("Mahasiswa berhasil ditambhkan!");
    this.reset();
});

renderTabel();