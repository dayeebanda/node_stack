window.onload = function () {

    let baseCropping = $('#cropped-image').croppie({
        viewport: {
            width: 200,
            height: 200
        },
        boundary: {
            width: 300,
            height: 300
        },
        showZoomer: true
    })

    function readableFile (file) {
        let reader = new FileReader()
        reader.onload = function (event) {
            baseCropping.croppie('bind', {
                url: event.target.result

            }).then(() => {
                $('.cr-slider').attr({
                    'min': 0.5000,
                    'max': 1.5000
                })
            })
        }
        reader.readAsDataURL(file)
    }
    $('#profilePicsFile').on('change', function (e) {
        if (this.files[0])
        {
            readableFile(this.files[0])
            $('#crop-modal').modal({
                backdrop: 'static',
                keyboard: false
            })

        }
    })
    $('#cancel-cropping').on('click', function () {
        $('#crop-modal').modal('hide')
        setTimeout(() => {
            baseCropping.croppie('distroy')
        }, 1000)


    })

    $('#upload-image').on('click', function () {
        baseCropping.croppie('result', 'blob')
            .then(blob => {
                let formData = new FormData()
                let file = document.getElementById('profilePicsFile').files[0]
                let name = generateFileName(file.name)
                formData.append('profilePics', blob, name)

                let headers = new Headers()
                headers.append('Accept', 'Application/JSON')
                let req = new Request('/uploads/profilePics', {
                    method: 'POST',
                    headers,
                    mode: 'cors',
                    body: formData
                })
                return fetch(req)
            })
            .then(res => res.json())
            .then(data => {
                document.getElementById('removeProfilePics').style.display = 'block'
                document.getElementById('profilePics').src = data.profilePics
                document.getElementById('profilePicsForm').requestFullscreen()

                $('#crop-modal').modal('hide')
                setTimeout(() => {
                    baseCropping.croppie('destroy')


                }, 1000)

            })
    })
}

function generateFileName (name) {
    const types = /(.jpeg|.jpg|.gif|.png)/
    return name.replace(types, '.png')
}