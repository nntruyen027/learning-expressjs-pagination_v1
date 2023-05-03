let currentPage = 1
let maxPage = 1

$.ajax(
    {
        url: './account?page=' + currentPage,
        type: 'GET'
    }
)
    .then(({ totalPage, data }) => {
        maxPage = totalPage

        let pagination = $('ul.pagination');
        console.log(pagination)

        pagination.append(`<li class="page-item"><a class="page-link" href="#" onclick="previousPage()">Previous</a></li>`)

        for (let index = 1; index <= totalPage; index++) {
            let item = `<li class="page-item"><a class="page-link" href="#" onclick="selectPage(${index})">${index}</a></li>`
            pagination.append(item)
        }

        pagination.append(`<li class="page-item"><a class="page-link" href="#" onclick="nextPage()">Next</a></li>`)
    })


function selectPage(page) {
    $.ajax({
        url: './account?page=' + page,
        type: 'GET',
    })
        .then(({ totalPage, data }) => {



            let content = $('#content').html('');
            currentPage = page

            if (data) {
                data.forEach(element => {
                    var item = `<h3>${element.username}</h3>`
                    content.append(item);
                });
            }

        })
        .catch(err => console.log('Lỗi: ' + err));
}

function previousPage() {
    currentPage--;
    currentPage = currentPage < 1 ? 1 : currentPage
    selectPage(currentPage);
}

function nextPage() {
    currentPage++;
    currentPage = currentPage > maxPage ? maxPage : currentPage
    selectPage(currentPage);

}